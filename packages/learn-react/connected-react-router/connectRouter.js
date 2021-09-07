// 进行router数据的同步操作

import { LOCATION_CHANGE } from "./actions"

const connectRouter = (history) => {
  const initialRouterState = {
    location: history.location,
    action: history.action,
  }
  return (state = initialRouterState, action) => {
    if (action.type === LOCATION_CHANGE) {
      console.log(action);
      return {
        ...state,
        ...action.payload
      }
    }
    return state
  }
}

export default connectRouter