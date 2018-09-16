// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Region from './Region';

import dashboardStyle from "./assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import dashboardRoutes from './routes/dashboard.jsx';

import logo from "./assets/img/reactlogo.png";
import image from "./assets/img/sidebar-2.jpg";

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

@withStyles(dashboardStyle)
class MainLayout extends React.Component<Props, State> {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const {classes, ...rest } = this.props;

    return (
    <div className={classes.wrapper}>
        <Sidebar
         routes={dashboardRoutes}
         logoText={'TLV'}
         logo={logo}
         image={image}
         minActive={true}
         color='purple'
         {...rest}/>
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            color='primary'
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest} />
          <div className={classes.content}>
            <Switch>
              <Route path='/region/:regionid' component={Region} />
            </Switch>
          </div>
          <Footer />
        </div>
    </div>);
  }
};

export default MainLayout;
