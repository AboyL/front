// redux的中文文档就有了非常好的实现了
// https://www.cntofu.com/book/4/docs/advanced/Middleware.md
// 当然 按照源码来得话就是一个compose的实现了
// 而这个也就是一个洋葱结构
// 从前到后逐步执行，并且把前一个的执行结果传递给后一个
// 简单来说
// compose(a,b,c,d)===d(c(b(a(...args))))
function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(function reducer (a, b) {
    return function (...args) {
      return a(b(...args))
    }
  })
}

// m1 m2 m3 
// 会被组合成什么样子 m3(m2(m1(...args)))
// const logger = store => next => action => {
//   console.log('dispatching')
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }

// 核心就是，现在的中间件执行完了就拿下一个的来执行，next是什么？next就是下一个的函数
// 这个next是 输出的参数的next
// 我们希望的就是m1执行完了就执行m2 m2执行完了就执行m3
// m1的next就是最原始的dispatch
// m2的next就是m1的返回结果
// m3的next就是m2的返回结果
const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, preloadedState) => {
    let store = createStore(reducer, preloadedState)
    let dispatch

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }

  }
}


// 这个实现会跟上面的实现不一样，虽然效果是一样的，但是当thunk起作用的时候
// dispatch会在调用了一轮以后再调用一轮
export const applyMiddleware2 = (...middlewares) => {
  middlewares = middlewares.slice()
  middlewares.reverse()
  return (createStore) => (reducer, preloadedState) => {
    let store = createStore(reducer, preloadedState)
    let dispatch = store.dispatch
    middlewares.forEach(middleware =>
      dispatch = middleware(store)(dispatch)
    )
    return {
      ...store,
      dispatch
    }
  }
}

export default applyMiddleware