import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from "classnames";
import PropTypes from "prop-types";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import GridItem from './GridItem';
import GridContainer from './GridContainer';
// core components
import Button from "./Button";

import headerStyle from "../assets/jss/material-dashboard-react/components/headerStyle.jsx";

class Header extends React.Component {

  fromDateChanged(date: Date) {
    this.props.dispatch({
      type: 'FROM_DATE_CHANGED',
      data: {
        date: date
      }
    });
  }

  tillDateChanged(date: Date) {
    this.props.dispatch({
      type: 'FROM_DATE_CHANGED',
      data: {
        date: date
      }
    });
  }

  makeBrand() {

    var name;
    this.props.routes.map((prop, key) => {
      if (prop.path === this.props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }

  render() {

    const { classes, color } = this.props;
    const appBarClasses = classNames({
      [" " + classes[color]]: color
    });

    const today = moment();

    let validDate = function(current) {
      return current.isBefore(today);
    }

    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button color="transparent" href="#" className={classes.title}>
              {::this.makeBrand()}
            </Button>
          </div>
          <GridContainer>
            <GridItem md={6}>
              <div>From</div>
              <Datetime
                isValidDate={ validDate }
                onChange={::this.fromDateChanged}
                defaultValue={this.props.fromDate}
                closeOnSelect={true}
                timeFormat={false}
                inputProps={{ placeholder: 'From', className: 'form-control' }}
                local='he'/>
            </GridItem>
            <GridItem md={6}>
              <div>Till</div>
              <Datetime
                isValidDate={ validDate }
                onChange={::this.tillDateChanged}
                defaultValue={this.props.tillDate}
                closeOnSelect={true}
                timeFormat={false}
                inputProps={{ placeholder: 'Till', className: 'form-control' }}
                local='he'/>
            </GridItem>
          </GridContainer>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

const mapStateToProps = state => {
  return {
    fromDate: state.fromDate,
    tillDate: state.tillDate
  }
}

export default withStyles(headerStyle)(connect(mapStateToProps)(Header));
