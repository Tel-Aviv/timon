// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { taskMiddleware } from 'react-palm';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers/reducers';

export const middlewares = [
  taskMiddleware
  //routerMiddleware(hashHistory)
];

export const enhancers = [applyMiddleware(...middlewares)];
const initialState = {};

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// let store = createStore(reducers,
//        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let store = createStore(reducers,
  initialState,
  composeEnhancers(...enhancers)
);

export default store;
