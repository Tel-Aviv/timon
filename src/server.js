import express  from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { HashRouter as Router}  from 'react-router-dom';
//import App from './App';

const app = express();

app.use(handleRender);

function handleRender(req, res) {

  // const componentHTML = ReactDom.renderToString(<Router>
  //                                                 <App />
  //                                               <Router>);

  return res.end('SSR');
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
