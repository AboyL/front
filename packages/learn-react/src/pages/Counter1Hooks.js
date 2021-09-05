
import React, { useState, useEffect } from 'react';
import actions from '../store/actions/counter1'
import { useSelector, useDispatch } from 'react-redux'
import store from '../store';
const Counter1Hooks = () => {
  const test = useSelector(state => state.counter1.number)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={()=>dispatch(actions.add1())} >add</button>
      <button onClick={()=>dispatch(actions.minus1())} >minus</button>
      <div>Counter1Hooks test{test}</div>
    </div>
  )
}

export default Counter1Hooks