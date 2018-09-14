// @flow
import React from 'react' ;
import { Switch, Redirect, Route } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

import dashboardRoutes from './routes/dashboard.jsx';

import dashboardStyle from "./assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

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

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

@withStyles(dashboardStyle)
export default
class Dashboard extends React.Component<Props, State> {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {

    const { classes, ...rest } = this.props;

    return <div className={classes.wrapper}>
       <Sidebar
         routes={dashboardRoutes}
         logoText={'TLV'}
         logo={logo}
         image={image}
         minActive={true}
         handleDrawerToggle={this.handleDrawerToggle}
         open={this.state.mobileOpen}
         color='purple'
         {...rest}
       />
      <div className={classes.mainPanel} ref="mainPanel">
          <Header
            color='primary'
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
          </div>
          <Footer />
      </div>
    </div>;
  }

}
