import React from "react";
import { render } from "react-dom";
import { combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router}  from 'react-router-dom';

import App from './App.jsx';
import store from './store';

render(<Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>,
      document.getElementById("root"));
