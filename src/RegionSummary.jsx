
// flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import classNames from 'classnames';
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
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

    const { classes, kind, ...rest } = this.props;

    const iconColor = classNames({
      "warning": kind === 'IN',
      "info": kind === 'OUT',
      "rose": kind === 'CROSS',
      "success": kind === "PASSENGERS"
    });

    return (
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color={iconColor} stats icon>
            <CardIcon color={iconColor} >
              <Icon>info_outline</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{this.props.kind}</p>
            <h3 className={classes.cardTitle}>
              {this.props.value} <small>Hundreds </small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              <span style={{
                  lineHeight: '2.2'
                }}>
              7 cameras considered
              </span>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
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
