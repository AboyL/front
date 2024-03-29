import { CALL_HISTORY_METHOD } from './actions'

const routerMiddleware = (history) => store => next => action => {
  // 改变路由
  if (action.type !== CALL_HISTORY_METHOD) {
    return next(action)
  }

  const { payload: { method, args } } = action
  history[method](...args)
}


export default routerMiddleware
