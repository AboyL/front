// import { createStore } from 'redux'
import { createStore } from '../../redux'

const initState = {
  test: 1
}

const reduer = (state = initState, action) => {
  switch (action.type) {
    case 'add':
      return {
        test: state.test + 1
      };
    case 'reduce':
      return {
        test: state.test - 1
      };
    default:
      return state
  }
}

const store = createStore(reduer)
export default store