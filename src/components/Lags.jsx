// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import Card from "./Card.jsx";
import CardHeader from "./CardHeader.jsx";
import CardBody from "./CardBody.jsx";
import Table from "./Table.jsx";

type Props = {
  items: {}
}

class Lags extends React.Component<Props> {

  render() {

    let _lags = this.props.items;

    const tableData = [
                        ['North', '00:44', '13%'],
                        ['South', '01:21', '213%'],
                        ['East', '00:24', '59%'],
                        ['West', '00:57', '33%']
                      ];

    return(
      <Card>
        <CardHeader color="primary">
          <div style={{textAlign: 'center'}}>Lost Time</div>
        </CardHeader>
        <CardBody>
          <Table tableHeaderColor="primary"
              tableHead={['Cluster', 'Lost Time', '%']}
              tableData={tableData}
          />
        </CardBody>
      </Card>
    )
  }

}

export default createFragmentContainer(Lags,
  graphql`
  fragment Lags_items on Region
  @argumentDefinitions(
    from: { type : "Date!" },
    till: { type: "Date!" }
  )
  {
      lagsDistribution(from: $from, till: $till) {
        labels
        values
      }
  }
  `);
