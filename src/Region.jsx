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
                      $from: Date!,
                      $till: Date!) {
    region(objectId: $regionId ) {
      summaries(from: $from, till: $till) {
        kind
        value
      }
      center {
        lat
        lon
      }
      cameras {
        objectId
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

      const tableData = [];
      props.region.cameras.map( (camera, index) => {
        tableData.push( [ camera.objectId, camera.name,  "Curaçao" , "Sinaai-Waas" , "$23,789"] )
      })

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
                        <Table tableHeaderColor="primary"
                              tableHead={['ID', 'Name','Country','City','Salary']}
                              tableData={tableData}
                          />
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
      regionId: parseInt(this.props.match.params.regionid, 10),
      from: moment().format('DD/MM/YYYY'),
      till: moment().format('DD/MM/YYYY')
    };

    const summariesKinds = [1,2,3,4];
    const distributions = [1,2,,3];

    return (<div>
      {queryVariables.regionId}
      {/*
      <GridContainer>
      {
          summariesKinds.map( (kind, index) => {
            return <RegionSummary classes={classes} key={index} kind={kind} />
          })
      }
      </GridContainer>
      <GridContainer>
        {
          distributions.map( (d, index) => {
            return <RegionChart classes={classes} key={index} />
          })
        }
      </GridContainer>
      */}
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
