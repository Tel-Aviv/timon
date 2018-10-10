// @flow
import React from 'react';
import ChartistGraph from "react-chartist";
// core components
import GridItem from "./GridItem.jsx";
import Card from "./Card.jsx";
import CardHeader from "./CardHeader.jsx";
import CardIcon from "./CardIcon.jsx";
import CardBody from "./CardBody.jsx";

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

class IconChart extends React.Component<Props> {

  render() {

    const {classes, type, data, title, color, ...rest} = this.props;

    return (
      <Card>
        <CardHeader icon>
          <CardIcon color={color}>
            {this.props.children}
          </CardIcon>
        </CardHeader>
        <CardBody>
            <ChartistGraph
              className="ct-chart"
              data={data}
              type={type}
              />
            <h4 className={classes.cardTitle}>{title}</h4>
            <p className={classes.cardCategory}>
            </p>
        </CardBody>
      </Card>
    )
  }
}

export default IconChart;