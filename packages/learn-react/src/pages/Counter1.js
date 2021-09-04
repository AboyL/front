
import React, { useState, useEffect } from 'react';
import store from "../store";
import action from '../store/actions/counter1'
import { bindActionCreators } from '../../redux'
const bindAction = bindActionCreators(action, store.dispatch)
export default () => {
  const [test, setTest] = useState(store.getState().counter1.number)
  useEffect(() => {
    store.subscribe(() => {
      setTest(store.getState().counter1.number)
    })
  }, [])
  return (
    <div>
      <button onClick={bindAction.add1} >add</button>
      <button onClick={bindAction.minus1} >minus</button>
      <div>counter1 test{test}</div>
    </div>
  )
}