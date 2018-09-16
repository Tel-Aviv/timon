// @flow
import React from 'react';

type Props = {

}

type State = {

}

class Region extends React.Component<Props, State> {

  // renderRegion({error, props}) {
  //   if( errors ) {
  //
  //   } else if( props) {
  //     <React.Fragment>
  //
  //     </React.Fragment>
  //   }
  // }

  render() {

    const queryVariables = {
      regionId: this.props.match.params.regionid
    };

    return <div>ddd</div>
  }

};

export default Region;
