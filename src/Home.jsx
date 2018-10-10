// @flow
import React from 'react' ;
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
import moment from 'moment';
import ChartistGraph from "react-chartist";
// @material-ui/core
import Divider from '@material-ui/core/Divider';
// Views
import Maps from './views/Maps/Maps';
import RegionSummary from './RegionSummary';
import IconChart from './components/IconChart';
// Icons
import ArrowOut from "@material-ui/icons/ArrowUpward";
import ArrowIn from "@material-ui/icons/ArrowDownward";
import PieChart from "@material-ui/icons/PieChart";

// Components
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
  query Home_Query ($from: Date!,
                    $till: Date!)
  {
  	clusters {
      id
      name
      clusterId
      ins (from: $from, till: $till)
      outs (from: $from, till: $till)

      cameras {
        id
        cameraId
        name
        location {
          lat
          lon
        }
      }

      gates{
        id
        name
        ins(from: $from, till: $till)
        outs(from: $from, till: $till)
      }
    }

  }
  `;

type State = {
  showClusterCameras: boolean,
  clusterName: String,
  clusterId: number
}

class Home extends React.Component<Props, State> {

  state = {
    showClusterCameras: false,
    clusterName: ''
  }

  tableRowClicked = (rowData) => {
    const clusterId = rowData[0];
    this.setState({
      showClusterCameras: true,
      clusterId: rowData[0],
      clusterName: rowData[1]
    });
  }

  renderHome( {error, props} ) {

    if( error ) {

      return (<main className="main-container">
                  <div className="main-content graphqlConnectionError">
                    {error.message}
                  </div>
              </main>)


    } else if( props) {

        this.clustersData = props.clusters;
        const cameras = _.flatten(props.clusters.map( cluster => cluster.cameras ));

        const tableData = [];

        const totalIns =
          props.clusters.reduce( (acc,cluster) => acc + cluster.ins, 0);
        const totalOuts =
          props.clusters.reduce( (acc,cluster) => acc + cluster.outs, 0);

        props.clusters.map( cluster => {
            const row = [cluster.clusterId.toString(),
                         cluster.name,
                        cluster.ins.toString(),
                        Number.parseFloat( (cluster.ins/totalIns * 100) ).toFixed(1) + '%',
                        cluster.outs.toString(),
                        Number.parseFloat( (cluster.outs/totalOuts * 100) ).toFixed(1) + '%'

                        ];
            tableData.push(row);
        });

        const chartType = 'Pie';
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
        let ClusterCamerasTable = null;
        if( this.state.showClusterCameras ) {

          const clusterId = this.state.clusterId;
          console.log(this.state.clusterId);
          console.log(this.clustersData[clusterId-1].gates);
          const gates = this.clustersData[clusterId-1].gates;

          const tableData = [];

          const totalIns = gates.reduce( (acc, gate) => acc + gate.ins, 0);
          const totalOuts = gates.reduce( (acc, gate) => acc + gate.outs, 0);

          gates.map( gate => {
            const row = [
              gate.name,
              gate.ins,
              Number.parseFloat( gate.ins/totalIns * 100 ).toFixed(1) + '%',
              gate.outs,
              Number.parseFloat( gate.ins/totalIns * 100 ).toFixed(1) + '%',
            ];
            tableData.push(row);
          });

          ClusterCamerasTable = (<Card>
            <CardHeader color="primary">
              <div>{this.state.clusterName}</div>
            </CardHeader>
            <CardBody>
              <Table tableHeaderColor="primary"
                tableHead={['Camera', 'Enters', '%','Exits', '%']}
                tableData={tableData}
                />
            </CardBody>
          </Card>);
        }

        const cityCenter = {lat:32.066667, lon:34.78333};
        const summaryNote = '3 cameras considered';

        return (
          <React.Fragment>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <RegionSummary classes={this.props.classes}
                  kind={'ENTRANCES'}
                  value={'23.455'}
                  color={'success'}
                  units={'vehicles'}
                  note={summaryNote}>
                  <ArrowIn />
              </RegionSummary>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <RegionSummary classes={this.props.classes}
                  kind={'EXITS'}
                  value={'564.490'}
                  color={'success'}
                  units={'vehicles'}
                  note={summaryNote}>
                  <ArrowOut />
                </RegionSummary>
              </GridItem>
            </GridContainer>
            <br />
            <Divider />
            <br />
            <GridContainer>

              <GridItem xs={12} sm={12} md={6}>
                <IconChart classes={this.props.classes}
                        type={chartType}
                        data={chartData}
                        title={'Vehicles'}
                        color={'info'}>
                    <PieChart />
                </IconChart>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <IconChart classes={this.props.classes}
                        type={chartType}
                        data={chartData2}
                        title={'Commutes'}
                        color={'info'}>
                    <PieChart />
                </IconChart>
              </GridItem>

            </GridContainer>
            <Divider />
            <br />
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="primary">
                    <div style={{textAlign: 'center'}}>Entrances/Exits</div>
                  </CardHeader>
                  <CardBody>
                    <Table tableHeaderColor="primary"
                          tableHead={['ID', 'Gate', 'Enters', '%','Exits', '%']}
                          tableData={tableData}
                          rowClickHandler={::this.tableRowClicked}
                      />
                    {ClusterCamerasTable}
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Maps center={cityCenter}
                      zoom={12}
                      cameras={cameras}/>
              </GridItem>
            </GridContainer>

          </React.Fragment>
        );
    }

    return (<div>Loading...</div>);
  }

  render() {

    const queryVariables = {
      from: moment(this.props.fromDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      till: moment(this.props.tillDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
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

export default withStyles(dashboardStyle)(connect(mapStateToProps)(Home));
