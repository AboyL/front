import React, { useEffect } from 'react';

import { onLocationChanged } from './actions'
import { Router } from 'react-router'
import { useDispatch } from '../react-redux'
const ConnectedRouter = ({ history, children }) => {

  // 监听history事件
  const dispatch = useDispatch()
  useEffect(() => {
    const handleLocationChange = (location, action,isFirstRendering) => {
      // 在变化的时候dispatch一个action进行路由同步
      dispatch(onLocationChanged(location, action,isFirstRendering))
    }
    const unlisten = history.listen(handleLocationChange)
    return unlisten
  }, [])
  return (
    <Router history={history}>
      {children}
    </Router>
  )
}

export default ConnectedRouter