
/**
 * 
 * @param {*} actionCreator  function add(){return {type:ADD};}
 * @param {*} dispatch store.dispatch
 */
function bindActionCreator (actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator.apply(this, args));
  }
}

/**
 * 
 * @param {*} actionCreators action的创建者 此处可以只传一个创建者，也就是一个函数，也可以传一个对象
 * @param {*} dispatch 
 */
const bindActionCreators = (actionCreators, dispatch) => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  const boundActionCreators = {}
  for (let key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}

export default bindActionCreators