// import { createStore } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router';

import reducer from './reducers'
import logger from './middlewares/logger'
import logger2 from './middlewares/logger2'
import thunk from './middlewares/thunk'
import { history } from './history';
import  createSagaMiddleware from 'redux-saga';
import rootSoga from './rootSoga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  // logger, logger2, 
  thunk, routerMiddleware(history),
  sagaMiddleware
]
// 两种方式
const store = createStore(reducer, undefined, applyMiddleware(...middleware))
// const store = applyMiddleware(...middleware)(createStore)(reducer)
sagaMiddleware.run(rootSoga)
export default store