
import React, { useState, useEffect } from 'react';
import store from "../store";

export default () => {
  const [test, setTest] = useState(store.getState().test)
  useEffect(() => {
    store.subscribe(() => {
      setTest(store.getState().test)
    })
  }, [])
  return (
    <div>
      <button onClick={() => store.dispatch({ type: 'add' })} >add</button>
      <button onClick={() => store.dispatch({ type: 'reduce' })} >reduce</button>
      <div>test{test}</div>
    </div>
  )
}