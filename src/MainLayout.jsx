// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
// Views
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Region from './Region';
import Home from './Home';
import Predictions from './views/Predictions/Predictions';
// Styles
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

const regionsQuery = graphql`
  query MainLayout_Query {
    regions{
      id
      name
    }
  }
`;

@withStyles(dashboardStyle)
class MainLayout extends React.Component<Props, State> {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  // renderSidebar = ({error, props}) => {
  //   if( props ) {
  //     // return (<div>
  //     //           {
  //     //             props.regions.map( (region) => {
  //     //               return region.name
  //     //             })
  //     //           }
  //     //         <div>)
  //   }
  //
  //   return (<div>Loading Sidebar...</div>);
  // }

  render() {
    const {classes, ...rest } = this.props;

    return (
    <div className={classes.wrapper}>
        <CssBaseline />
        {/*
        <QueryRenderer
          environment={environment}
          query={regionsQuery}
          render={::this.renderSidebar}
        />
      */}
        <Sidebar
         routes={dashboardRoutes}
         logoText={'Traffic Monitor'}
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
              <Route path='/home' component={Home} />
              <Route path='/predictions' component={Predictions} />
            </Switch>
          </div>
          <Footer />
        </div>
    </div>);
  }
};

export default MainLayout;
