export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'


export const onLocationChanged = (location, action, isFirstRendering = false) => ({
  type: LOCATION_CHANGE,
  payload: {
    location,
    action,
    isFirstRendering,
  }
})

export const push = (...args) => {
  return {
    type:CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args
    }
  }
}