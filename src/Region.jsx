// @flow
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import ChartistGraph from "react-chartist";
import moment from 'moment';

import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowOut from "@material-ui/icons/ArrowUpward";
import ArrowIn from "@material-ui/icons/ArrowDownward";
// core components
import GridItem from "./components/GridItem.jsx";
import GridContainer from "./components/GridContainer.jsx";
import Card from "./components/Card.jsx";
import CardHeader from "./components/CardHeader.jsx";
import CardIcon from "./components/CardIcon.jsx";
import CardBody from "./components/CardBody.jsx";
import CardFooter from "./components/CardFooter.jsx";
import Danger from "./components/Danger.jsx";
import Table from "./components/Table.jsx";

import Maps from './views/Maps/Maps';

import RegionSummary from './RegionSummary';
import RegionChart from './RegionChart';
import dashboardStyle from "./assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "./variables/charts";

type Props = {
  classes: {
    cardCategory: {},
    cardTitle: {},
    stats: {}
  }
}

type State = {

}

const summariesQuery = graphql`
  query Region_Query ($regionId: Int!,
                      $directionIn: Direction!,
                      $directionOut: Direction!,
                      $weekFrom: Date!,
                      $from: Date!,
                      $till: Date!) {
    region(regionId: $regionId ) {

      summaries(from: $from, till: $till) {
        kind
        value
      }

      hourlyDistribution(date: $till) {
        labels
        values
      }

      vehicleTypeDistribution(date: $till) {
        labels
        values
      }

      dayOfWeekDisrtibution(from: $weekFrom, till: $till){
        labels
        values
		  }

      ins: intersectionDistribution(
        direction: $directionIn
        from: $from
        till: $till
      ) {
        cameraName
        Total
        NorthCluster
        SouthCluster
        EastCluster
        WestCluster
      }

      outs: intersectionDistribution(
        direction: $directionOut
        from: $from
        till: $till
      ) {
        cameraName
        Total
        NorthCluster
        SouthCluster
        EastCluster
        WestCluster
      }

      center {
        lat
        lon
      }

      cameras {
        cameraId
        name
        location {
          lat
          lon
        }
      }
    }
  }
`;

class Region extends React.Component<Props, State> {

  renderWeeklyDistributionChart(data) {

    const {classes, ...rest } = this.props;
    const chartData = {
      series: data.values,
      labels: data.labels
    };
    const chartType = 'Bar';
    const chartTille = 'Weekly Distribution';
    const color = 'success';

    return (
      <GridItem xs={12} sm={12} md={4}>
        <RegionChart classes={classes}
                      type={chartType}
                      data={chartData}
                      title={chartTille}
                      color={color} />
      </GridItem>);

  }

  renderHourlyDistributionChart(data) {

    const {classes, ...rest } = this.props;
    const chartData = {
      series: data[0].values,
      labels: data[0].labels
    };

    const chartType = 'Bar';
    const chartTille = 'Hourly Distribution';
    const color = 'warning';

    return (
      <GridItem xs={12} sm={12} md={4}>
        <RegionChart classes={classes}
                      type={chartType}
                      data={chartData}
                      title={chartTille}
                      color={color}  />
      </GridItem>
    );
  }

  renderVehicleTypeDistributionChart(data) {

    const {classes, ...rest } = this.props;
    const chartData = {
      series: data.values,
      labels: data.labels
    };

    const chartType = 'Pie';
    const chartTille = 'Vehicle Types';
    const color = 'danger';

    return (
      <GridItem xs={12} sm={12} md={4}>
        <RegionChart classes={classes}
                      type={chartType}
                      data={chartData}
                      title={chartTille}
                      color={color}>

        </RegionChart>
      </GridItem>);

  }

  renderRegion( {error, props} ) {

    const summariesKinds = [1,2,3,4];
    if( error ) {

      return (<main className="main-container">
                  <div className="main-content graphqlConnectionError">
                    {error.message}
                  </div>
              </main>)
    } else if( props) {

      const tableDataIns = [];
      const tableDataOuts = [];

      props.region.ins.map( gate => {
        tableDataIns.push([
                            gate.cameraName,
                            gate.Total.toString(),
                            gate.NorthCluster.toString(),
                            gate.SouthCluster.toString(),
                            gate.EastCluster.toString(),
                            gate.WestCluster.toString()
                          ])
      });

      props.region.outs.map( gate => {
          tableDataOuts.push([
                              gate.cameraName,
                              gate.Total.toString(),
                              gate.NorthCluster.toString(),
                              gate.SouthCluster.toString(),
                              gate.EastCluster.toString(),
                              gate.WestCluster.toString()
                            ])
      });

      const distributions = [1];
      const {classes, ...rest } = this.props;

      return (<React.Fragment>
                <GridContainer>
                  {
                   summariesKinds.map( (kind, index) => {

                     let iconColor = 'warning';
                     switch( kind ) {
                        case  1: { // 'IN'
                          iconColor = 'warning';
                        }
                        break;

                        case 2: { // 'OUT'
                          iconColor = 'info';
                        }
                        break;

                        case 3: { // 'CROSS'
                          iconColor = 'rose';
                        }
                        break;

                        case 4: { // 'PEOPLE'
                          iconColor = 'success';
                        }
                        break;
                     }

                     return (<GridItem xs={12} sm={6} md={3} key={index}>
                                <RegionSummary classes={this.props.classes}
                                           kind={props.region.summaries[index].kind}
                                           value={props.region.summaries[index].value}
                                           color={iconColor}>
                                    <ArrowOut />
                                </RegionSummary>
                            </GridItem>)
                  })
                }
                </GridContainer>
                <GridContainer>
                  {::this.renderWeeklyDistributionChart(props.region.dayOfWeekDisrtibution)}
                  {::this.renderHourlyDistributionChart(props.region.hourlyDistribution)}
                  {::this.renderVehicleTypeDistributionChart(props.region.vehicleTypeDistribution)}
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                          <CardHeader color="primary">
                            <div style={{textAlign: 'center'}}>Entrances Interceptions with Gates</div>
                          </CardHeader>
                          <CardBody>
                            <Table tableHeaderColor="primary"
                                tableHead={['Camera', 'Total','North','South','East', 'West']}
                                tableData={tableDataIns}
                            />
                          </CardBody>
                      </Card>
                      <Card>
                        <CardHeader color="primary">
                          <div style={{textAlign: 'center'}}>Exits Interceptions with Gates</div>
                        </CardHeader>
                        <CardBody>
                          <Table tableHeaderColor="primary"
                            tableHead={['Gate', 'Total','North','South','East', 'West']}
                            tableData={tableDataOuts}
                          />
                        </CardBody>
                    </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Maps center={props.region.center}
                            cameras={props.region.cameras}/>
                    </GridItem>
                </GridContainer>

            </React.Fragment>);
    }

    return (<div>Loading...</div>);
  }

  render() {

    const {classes, ...rest } = this.props;

    const queryVariables = {
      directionIn: 'IN',
      directionOut: 'OUT',
      regionId: parseInt(this.props.match.params.regionid, 10),
      weekFrom: '18/09/2018',
      from: '24/09/2018', //moment().format('DD/MM/YYYY'),
      till: '25/09/2018'
    };

    return (<React.Fragment>

      <QueryRenderer
        environment={environment}
        query={summariesQuery}
        variables={queryVariables}
        render={::this.renderRegion}
        />
    </React.Fragment>)
  }

};

const mapStateToProps = state => {
  return {
    fromDate: state.fromDate,
    tillDate: state.tillDate
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(Region));
