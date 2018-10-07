// @flow
import React from 'react';
import ChartistGraph from "react-chartist";
// core components
import GridItem from "./components/GridItem.jsx";
import Card from "./components/Card.jsx";
import CardHeader from "./components/CardHeader.jsx";
import CardBody from "./components/CardBody.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "./variables/charts";

type Props = {
  classes : {
    cardTitle: {},
    cardCategory: {}
  },
  type: String,
  data: [],
  title: String,
  color: String
}

class RegionChart extends React.Component<Props> {

  render() {

    const {classes, type, data, title, color, ...rest} = this.props;

    return (
      <Card chart>
        <CardHeader color={color}>
          <ChartistGraph
            className="ct-chart"
            data={data}
            type={type}
            />
        </CardHeader>
        <CardBody>
            <h4 className={classes.cardTitle}>{title}</h4>
            <p className={classes.cardCategory}>
            </p>
        </CardBody>
      </Card>
    )
  }
}

export default RegionChart;
