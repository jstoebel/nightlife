import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/containers/AppContainer';
import C from './constants';
import cookie from 'react-cookie';

import HomePage from './components/pages/home-page'

import Login from './components/containers/LoginContainer';
import Logout from './components/containers/LogoutContainer';
import NotFoundPage from './components/pages/not-found-page';
import {Provider} from 'react-redux';
import React from 'react';
import reducers from './reducers/index';
import thunk from 'redux-thunk'
import Register from './components/containers/RegisterContainer';
import {render} from 'react-dom';
import requireAuth from './components/containers/AuthenticationContainer';
import startingState from './initialState.json';

import {addError, removeError, searchBars} from './actions'

/* set up of store
  1) pull state from browser
  2) creates the store with middle ware and initial state
  3) add subscription to store so its saved to browser localStorage

*/

// middle ware to log changes to state
const consoleMessages = store => next => action => {

  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  result = next(action)


  console.log(store.getState())

  console.groupEnd()

  return result

}


// either pulls local storage or, if its absent, grabs from sample data
const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    startingState;

const createStoreWithMiddleware = applyMiddleware(consoleMessages, thunk)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

const saveState = () =>
  localStorage['redux-store'] = JSON.stringify(store.getState());
store.subscribe(saveState);

// REMOVE ME! attach store and cookie to window for development
window.store = store;
window.cookie = cookie;

// if user has a token mark them as logged in
const token = cookie.load('token');

if (token) {
  store.dispatch({type: C.AUTH_USER});
}


render(
  <BrowserRouter>
    <div>
      <Provider store={store}>
        <App>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />            
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </App>
      </Provider>
    </div>
  </BrowserRouter>,
  document.querySelector('#root')
);
