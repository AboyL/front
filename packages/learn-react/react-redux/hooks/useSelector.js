
import { useContext, useState, useLayoutEffect, useRef } from 'react';
import ReactReduxContext from "../reactReduxContext";

// 默认浅比较
const defaultEquality = (a, b) => a === b

const useSelector = (selector, equalityFn = defaultEquality) => {
  const { store } = useContext(ReactReduxContext)
  let lastSelectedState = useRef(null);
  const [state, setState] = useState(selector(store.getState()))
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 进行比较判断决定是否重新渲染 可以提高性能
      let selectedState = selector(store.getState());
      if (!equalityFn(lastSelectedState.current, selectedState)) {
        setState(selectedState)
      }
      lastSelectedState.current = selectedState;
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return state
}

export default useSelector