
import React, { useState, useEffect } from 'react';
import store from "../store";
import action from '../store/actions/counter2'
import { bindActionCreators } from '../../redux'
const bindAction = bindActionCreators(action, store.dispatch)
export default () => {
  const [test, setTest] = useState(store.getState().counter2.number)
  useEffect(() => {
    store.subscribe(() => {
      setTest(store.getState().counter2.number)
    })
  }, [])
  return (
    <div>
      <button onClick={bindAction.add2} >add</button>
      <button onClick={bindAction.minus2} >minus</button>
      <div>counter2 test{test}</div>
    </div>
  )
}