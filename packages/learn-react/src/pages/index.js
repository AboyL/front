
import React, { useState, useEffect } from 'react';
import store from "../store";
// import { bindActionCreators } from 'redux'
import { bindActionCreators } from '../../redux'

const actions = {
  add () {
    return {
      type: 'add'
    }
  },
  reduce () {
    return {
      type: 'reduce'
    }
  }
}
const bindAction = bindActionCreators(actions, store.dispatch)

export default () => {
  const [test, setTest] = useState(store.getState().test)
  useEffect(() => {
    store.subscribe(() => {
      setTest(store.getState().test)
    })
  }, [])
  return (
    <div>
      <button onClick={bindAction.add} >add</button>
      <button onClick={bindAction.reduce} >reduce</button>
      <div>test{test}</div>
    </div>
  )
}