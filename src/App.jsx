// flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainLayout from './MainLayout.jsx';

import image from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";

type State = {
  mobileOpen: boolean
}

type Props = {
  classes: {
    wrapper: {},
    mainPanel: {},
    content: {}
  }
}

export default
class App extends React.Component<Props, State> {

  render() {
    return <Switch>
      <Route path='/' component={MainLayout} />
    </Switch>
  }

 }
