
// flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import classNames from 'classnames';
// @material-ui/icons
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

type Props = {
  value: number
};

class RegionSummary extends React.Component<Props> {

  render() {

    const { classes, kind, color, units, note, ...rest } = this.props;

    return (

        <Card>
          <CardHeader color={color} stats icon>
            <CardIcon color={color}>
              {this.props.children}
            </CardIcon>
            <h2 className={classes.cardCategory} style={{
                color: 'black'
              }}>{kind}</h2>
            <h3 className={classes.cardTitle}>
              {this.props.value} <small>{units}</small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              <span style={{
                  lineHeight: '2.2'
                }}>
              {note}
              </span>
            </div>
          </CardFooter>
        </Card>
    );
  }
};

export default RegionSummary;

// export default createFragmentContainer(RegionSummary,
// graphql`
//   fragment RegionSummary_value on Summary
//   @argumentDefinitions(
//     kind: { type: String }
//   )
//   {
//     value(kind: $kind)
//   }
// `);
