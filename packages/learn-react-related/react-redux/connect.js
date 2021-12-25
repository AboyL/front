import React, { useState, useContext, useLayoutEffect } from 'react';
import { bindActionCreators } from '../redux';
import ReactReduxContext from "./reactReduxContext";

const connect = (mapStateToProps, mapDispatchToProps) => {
  // 返回一个接受组件的函数
  return (OldComponent) => {
    // 返回一个组件
    return (props) => {
      const { store } = useContext(ReactReduxContext)
      const [state, setState] = useState(mapStateToProps(store.getState()))
      let dispaths = {}
      if (typeof mapDispatchToProps === 'function') {
        dispaths = mapDispatchToProps(store.dispatch)
      } else if (typeof mapDispatchToProps === 'object') {
        dispaths = bindActionCreators(mapDispatchToProps, store.dispatch)
      } else {
        throw Error('mapDispatchToProps must is a function or a Object')
      }

      useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => setState(mapStateToProps(store.getState())))
        return () => {
          unsubscribe()
        }
      }, [])

      return <OldComponent {...props} {...state} {...dispaths} />
    }
  }
}

export default connect