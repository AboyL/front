// next 就是 dispatch
const logger = store => next => action => {
  console.log('dispatching')
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default logger