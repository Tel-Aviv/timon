// @flow
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import ChartistGraph from "react-chartist";
import moment from 'moment';

import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
// @material-ui/core
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowOut from "@material-ui/icons/ArrowUpward";
import ArrowIn from "@material-ui/icons/ArrowDownward";
import CrossIcon from "@material-ui/icons/SwapVert";
import PeopleIcon from "@material-ui/icons/DirectionsWalk";
import PieChart from "@material-ui/icons/PieChart";
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
import IconChart from './components/IconChart';
import IconChartLegend from './components/IconChartLegend';
import RaisedChart from './components/RaisedChart';

import Maps from './views/Maps/Maps';

import RegionSummary from './RegionSummary';
import Lags from './components/Lags';

const LagsComponent = Loadable({
  loader: () => import('./components/Lags'),
  loading: () => { return (<div>Loading...</div>) }
});

import dashboardStyle from "./assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

type Props = {
  classes: {
    cardCategory: {},
    cardTitle: {},
    stats: {}
  }
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

      commuteDistribution(from: $from, till: $till) {
        labels
        values
      }

      ...Lags_items @arguments(from: $from, till: $till)

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

class Region extends React.Component<Props> {

  renderSummaries(data, countCameras) {

    const note = `${countCameras} cameras considered`;

    return (
      <React.Fragment>

        <GridItem xs={12} sm={6} md={3}>
          <RegionSummary classes={this.props.classes}
                     kind={'ENTRANCES'}
                     value={data[0].value}
                     color={'warning'}
                     units={'vehicles'}
                     note={note}>
              <ArrowOut />
          </RegionSummary>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <RegionSummary classes={this.props.classes}
                     kind={'EXITS'}
                     value={data[1].value}
                     color={'info'}
                     units={'vehicles'}
                     note={note}>
              <ArrowIn />
          </RegionSummary>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <RegionSummary classes={this.props.classes}
                     kind={'CROSS'}
                     value={data[2].value}
                     color={'rose'}
                     units={'vehicles'}
                     note={note}>
              <CrossIcon />
          </RegionSummary>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <RegionSummary classes={this.props.classes}
                     kind={'PEDESTRIANS'}
                     value={data[3].value}
                     color={'success'}
                     units={'people'}
                     note={note}>
              <PeopleIcon />
          </RegionSummary>
        </GridItem>
    </React.Fragment>
    )
  }

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
        <RaisedChart classes={classes}
                      type={chartType}
                      data={chartData}
                      title={chartTille}
                      color={color} />
      );

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

        <RaisedChart classes={classes}
                      type={chartType}
                      data={chartData}
                      title={chartTille}
                      color={color}  />
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
    const options = {
        labelInterpolationFnc: function(value) {
          const total = chartData.series.reduce((a,b) => a + b);
          const index = chartData.labels.findIndex( label => label === value );
          return Math.round(chartData.series[index] / total * 100) + '%';
        },
        chartPadding: 0,
        labelDirection: 'explode'
    };

    return (

        <IconChart classes={classes}
                   type={chartType}
                   data={chartData}
                   title={chartTille}
                   color={color}
                   options={options}
                   legend={
                       <IconChartLegend data={chartData.labels} />
                     }>
              <PieChart style={{color: 'white'}} />
        </IconChart>
      );

  }

  renderNomotorsDistributionChart() {

    const {classes, ...rest } = this.props;
    const chartData = {
      labels: ['bikes', 'corkinets', 'others'],
      series: [20, 15, 40]
    };

    const chartTille = 'No Motor Vehicles';
    const color = 'danger';
    const chartType = 'Pie';

    const options = {
        labelInterpolationFnc: function(value) {
          const total = chartData.series.reduce((a,b) => a + b);
          const index = chartData.labels.findIndex( label => label === value );
          return Math.round(chartData.series[index] / total * 100) + '%';
        },
        chartPadding: 0,
        labelDirection: 'explode'
    };

    return (
        <div>

          <IconChart classes={classes}
                     type={chartType}
                     data={chartData}
                     title={chartTille}
                     color={color}
                     options={options}
                     legend={
                       <IconChartLegend data={chartData.labels} />
                     }>
              <PieChart style={{color: 'white'}} />
          </IconChart>

        </div>
    )
  }

  renderCommutesChart(data) {

    const {classes, ...rest } = this.props;

    const chartData = {
      series: data.values[1],
      labels: data.labels
    };

    const chartType = 'Pie';
    const chartTille = 'Commutes';
    const color = 'danger';
    const options = {
        labelInterpolationFnc: function(value) {
          const total = chartData.series.reduce((a,b) => a + b);
          const index = chartData.labels.findIndex( label => label === value );
          return Math.round(chartData.series[index] / total * 100) + '%';
        },
        labelOffset: 70,
        chartPadding: 20,
        labelDirection: 'explode'
    };


    return (
        <IconChart classes={classes}
                    type={chartType}
                    data={chartData}
                    title={chartTille}
                    color={color}
                    options={options}
                    legend={
                       <IconChartLegend data={chartData.labels} />
                    }>
            <PieChart style={{color: 'white'}} />
        </IconChart>
    );

  }

  renderRegion( {error, props} ) {

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

                    {::this.renderSummaries(props.region.summaries,
                                            props.region.cameras.length)}

                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    {::this.renderWeeklyDistributionChart(props.region.dayOfWeekDisrtibution)}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    {::this.renderHourlyDistributionChart(props.region.hourlyDistribution)}
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {::this.renderVehicleTypeDistributionChart(props.region.vehicleTypeDistribution)}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {::this.renderNomotorsDistributionChart()}
                  </GridItem>
                </GridContainer>

                <Divider />
                <br />

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
                            tableHead={['Camera', 'Total','North','South','East', 'West']}
                            tableData={tableDataOuts}
                          />
                        </CardBody>
                    </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Maps center={props.region.center}
                            zoom={16}
                            cameras={props.region.cameras}/>
                    </GridItem>
                </GridContainer>
                <br />
                <Divider />
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {::this.renderCommutesChart(props.region.commuteDistribution)}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Lags items={props.region} />
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
      weekFrom: moment(this.props.fromDate, 'DD/MM/YYYY').add(-7, 'days').format('DD/MM/YYYY'),
      from: this.props.fromDate,
      till: this.props.tillDate
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
    fromDate: state.app.fromDate,
    tillDate: state.app.tillDate
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(Region));
