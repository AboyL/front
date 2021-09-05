
import React from 'react';
import actions from '../store/actions/counter1'
import { useSelector, useDispatch } from '../../react-redux'


const Counter1Hooks = () => {
  const test = useSelector(state => state.counter1.number,(a,b)=>{
    if(a===2){
      return true
    }
    return false
  })
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={()=>dispatch(actions.add1())} >add</button>
      <button onClick={()=>dispatch(actions.minus1())} >minus</button>
      <button onClick={()=>dispatch(actions.delayAdd())} >delayAdd</button>
      <div>Counter1Hooks test{test}</div>
    </div>
  )
}

export default Counter1Hooks