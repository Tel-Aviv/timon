import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from 'history';
import { HashRouter as Router}  from 'react-router-dom';
import App from './App.jsx';

const hist = createBrowserHistory();

ReactDOM.render(<Router>
                  <App />
                </Router>,
              document.getElementById("root"));
