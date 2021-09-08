
import React, { useState, useEffect } from 'react';
// import { Route, Switch,Link } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom';
import Counter1 from './Counter1';
import Counter2 from './Counter2';
import Counter1Hooks from './Counter1Hooks';
import Change from './Change';

import { Provider } from 'react-redux'
import store from "../store";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store/history';

export default () => {
  window.store = store
  return (
    <Provider store={store}>
      <Counter1 />
      <Counter2 />
      <Counter1Hooks />
      <ConnectedRouter history={history}>
        <>
          <div>
            <Change />
          </div>
          <Switch>
            <Route exact path="/" render={() => (<div>Match</div>)} />
            <Route path="/test" render={() => (<div>test</div>)} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}