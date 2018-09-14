// flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

 const App = (props) => {

   return <Switch>
      <Route path='/' component={Dashboard} />
   </Switch>

 }

 export default App;
