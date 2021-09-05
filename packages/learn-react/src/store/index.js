// import { createStore } from 'redux'
import { createStore, applyMiddleware } from '../../redux'

import reducer from './reducers'
import logger from './middlewares/logger'
import logger2 from './middlewares/logger2'
import thunk from './middlewares/thunk'

const middleware = [logger, logger2, thunk]
// 两种方式
const store = createStore(reducer, undefined,applyMiddleware(...middleware))
// const store = applyMiddleware(...middleware)(createStore)(reducer)

export default store