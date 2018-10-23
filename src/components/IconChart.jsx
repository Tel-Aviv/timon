// @flow
import React from 'react';
import ChartistGraph from "react-chartist";
// core components
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography';

import Card from "./Card.jsx";
import CardHeader from "./CardHeader.jsx";
import CardIcon from "./CardIcon.jsx";
import CardBody from "./CardBody.jsx";

type Props = {
  classes: {
    cardTitle: {},
    cardCategory: {}
  },
  type: String,
  data: [],
  title: String,
  color: String,
  options: any,
  legend: any
}

class IconChart extends React.Component<Props> {

  render() {

    const {
      classes,
      type,
      data,
      title,
      color,
      options,
      ...rest
    } = this.props;

    return (<Card>
      <CardHeader title={title}>
        <CardIcon color={color}>
          {this.props.children}
        </CardIcon>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody>
        <ChartistGraph className="ct-octave" data={data} type={type} options={options}/>
        <Typography component="h2">
          Legend
        </Typography>
        {this.props.legend}
      </CardBody>
    </Card>)
  }
}

export default IconChart;
