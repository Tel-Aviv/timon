// @flow
import React from 'react';
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

      dayOfWeekDisrtibution(from: $weekFrom, till: $till){
        labels
        values
		  }


      ins: clusterDistribution(
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

      outs: clusterDistribution(
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

      return (<React.Fragment>
                <GridContainer>
                  {
                   summariesKinds.map( (kind, index) => {
                   return <RegionSummary classes={this.props.classes}
                                         kind={props.region.summaries[index].kind}
                                         value={props.region.summaries[index].value}
                                        key={index} />
                  })
                }
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                          <CardHeader color="primary">
                            <div style={{textAlign: 'center'}}>Entrances</div>
                          </CardHeader>
                          <CardBody>
                          <Table tableHeaderColor="primary"
                              tableHead={['Gate', 'Total','North','South','East', 'West']}
                              tableData={tableDataIns}
                          />
                      </CardBody>
                      </Card>
                      <Card>
                        <CardHeader color="primary">
                          <div style={{textAlign: 'center'}}>Exits</div>
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

    const summariesKinds = [1,2,3,4];
    const distributions = [1,2,3];

    return (<div>
      {/*
      <GridContainer>
      {
          summariesKinds.map( (kind, index) => {
            return <RegionSummary classes={classes} key={index} kind={kind} />
          })
      }
      </GridContainer>
            */}

      <GridContainer>
        {
          distributions.map( (d, index) => {
            return <RegionChart classes={classes} key={index} />
          })
        }
      </GridContainer>
      <QueryRenderer
        environment={environment}
        query={summariesQuery}
        variables={queryVariables}
        render={::this.renderRegion}
        />
    </div>)
  }

};


export default withStyles(dashboardStyle)(Region);
