
// flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
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

type Props = {
  value: number
};

class RegionSummary extends React.Component<Props> {

  render() {

    const { classes, ...rest } = this.props;

    return <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <Icon>content_copy</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{this.props.kind}</p>
            <h3 className={classes.cardTitle}>
              {this.props.value} <small>Hundreds  </small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              <a href="#pablo" onClick={e => e.preventDefault()}>
                Get more space
              </a>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
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
