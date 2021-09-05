// next 就是 dispatch
const logger = store => next => action => {
  console.log('dispatching2')
  let result = next(action)
  console.log('next state2', store.getState())
  return result
}

export default logger