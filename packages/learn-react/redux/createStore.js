const createStore = (reducer, preloadedState) => {
  let state = preloadedState
  const listeners = []
  const getState = () => {
    return state
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return function unsubscribe () {
      const index = listeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // 真正的初始化操作 preloadedState 可以传也可以不传
  dispatch({ type: '@@REDXU/INIT' });

  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore