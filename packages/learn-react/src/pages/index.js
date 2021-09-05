
import React, { useState, useEffect } from 'react';
import Counter1 from './Counter1';
import Counter2 from './Counter2';
import Counter1Hooks from './Counter1Hooks';
import { Provider } from '../../react-redux'
import store from "../store";

export default () => {
  return (
    <div>
      <Provider store={store}>
        <Counter1 />
        <Counter2 />
        <Counter1Hooks />
      </Provider>
    </div>
  )
}