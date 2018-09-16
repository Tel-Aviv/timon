// @flow
import React from 'react';
import ChartistGraph from "react-chartist";
// core components
import GridItem from "./components/GridItem.jsx";
import Card from "./components/Card.jsx";
import CardHeader from "./components/CardHeader.jsx";
import CardBody from "./components/CardBody.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "./variables/charts";

type Props = {
  classes : {
    cardTitle: {},
    cardCategory: {}
  }
}

class RegionChart extends React.Component<Props> {

  render() {

    const {classes, ...rest} = this.props;

    return <GridItem xs={12} sm={12} md={4}>
      <Card chart>
        <CardHeader color="success">
          <ChartistGraph
            className="ct-chart"
            data={dailySalesChart.data}
            options={dailySalesChart.options}
            listener={dailySalesChart.animation}
            type="Line"
            />
        </CardHeader>
        <CardBody>
            <h4 className={classes.cardTitle}>Daily Sales</h4>
            <p className={classes.cardCategory}>
            </p>

        </CardBody>
      </Card>
    </GridItem>
  }
}

export default RegionChart;
