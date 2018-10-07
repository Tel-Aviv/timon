// @flow
import React from 'react' ;
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
import moment from 'moment';
import ChartistGraph from "react-chartist";

import RegionSummary from './RegionSummary';

import GridItem from "./components/GridItem.jsx";
import GridContainer from "./components/GridContainer.jsx";
import Card from "./components/Card.jsx";
import CardHeader from "./components/CardHeader.jsx";
import CardIcon from "./components/CardIcon.jsx";
import CardBody from "./components/CardBody.jsx";
import CardFooter from "./components/CardFooter.jsx";
import Danger from "./components/Danger.jsx";
import Table from "./components/Table.jsx";

import dashboardStyle from "./assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const homeQuery = graphql`
  query Dashboard_Query ($from: Date!,
                         $till: Date!)
  {
  	clusters {
      name
      ins (from: $from, till: $till)
      outs (from: $from, till: $till)
    }
  }
  `;

class Dashboard extends React.Component<Props, State> {

  renderHome( {error, props} ) {

    if( error ) {

      return (<main className="main-container">
                  <div className="main-content graphqlConnectionError">
                    {error.message}
                  </div>
              </main>)


    } else if( props) {

        const tableData = [];
        props.clusters.map( cluster => {
            const row = [cluster.name,
                        '19', cluster.ins.toString(),
                        '45', cluster.outs.toString()];
            tableData.push(row);
        });

        const chatType = 'Pie';
        const chartData = {
          //series: [[340, 209, 33]],
          series: [340, 209, 33],
          labels: ['cars', 'tracks', 'buses']
        };


        const chartData2 = {
          //series: [[340, 209, 33]],
          series: [52.7, 12.3, 7.00],
          labels: ['First Time', 'Once At Month', 'Once At Week']
        };
        // var options = {
        //   high: 10,
        //   low: -10,
        //   axisX: {
        //     labelInterpolationFnc: function(value, index) {
        //       return index % 2 === 0 ? value : null;
        //     }
        //   }
        // };

        return (
          <React.Fragment>
            <GridContainer>
                <RegionSummary classes={this.props.classes}
                  kind={'IN'}
                  value={'23.455'}
                />
                <RegionSummary classes={this.props.classes}
                  kind={'OUT'}
                  value={'564.490'}
                />
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <ChartistGraph
                  className="ct-chart"
                  data={chartData}
                  type={chatType}
                  />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <ChartistGraph
                  className="ct-chart"
                  data={chartData2}
                  type={chatType}
                  />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="primary">
                    <div style={{textAlign: 'center'}}>Entrances/Exits</div>
                  </CardHeader>
                  <CardBody>
                    <Table tableHeaderColor="primary"
                          tableHead={['Gate', '%', 'Enters', '%','Exits']}
                          tableData={tableData}
                      />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </React.Fragment>
        );
    }

    return (<div>Loading...</div>);
  }

  render() {

    const queryVariables = {
      from: '24/09/2018',
      till: '25/09/2018'
    };

    return (<React.Fragment>
              <QueryRenderer
                environment={environment}
                query={homeQuery}
                variables={queryVariables}
                render={::this.renderHome}/>
            </React.Fragment>)
  }

}

const mapStateToProps = state => {
  return {
    fromDate: state.fromDate,
    tillDate: state.tillDate
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(Dashboard));
