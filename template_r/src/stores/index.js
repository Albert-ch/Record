import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducers from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__  || (() => (noop) => noop);

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
});
const middlewares = [routerMiddleware(history), thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const enhancers = [applyMiddleware(...middlewares), devtools()];

const initState = {};
const store = createStore(rootReducer(history), initState, compose(...enhancers));

export default store;
