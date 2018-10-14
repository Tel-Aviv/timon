// @flow
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuery, graphql } from 'react-relay';
import environment from './Environment';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
// Kepler.gl actions
import { addDataToMap, forwardTo } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
import { injectComponents, PanelHeaderFactory } from 'kepler.gl/components';

import tlvConfig from '../data/tlv-config.json';

const MAPBOX_TOKEN = process.env.MapboxAccessToken;

// define custom header
// const CustomHeader = () => (<div></div>);
// const myCustomHeaderFactory = () => CustomHeader;
//
// // Inject custom header into Kepler.gl, replacing default
// const KeplerGl = injectComponents([
//   [PanelHeaderFactory, myCustomHeaderFactory]
// ]);

const keplerQuery = graphql`
  query DataVis_Query($from: Date!,
                      $till: Date!) {
      keplerDataUrl(from: $from, till: $till)
  }
`;

type Props = {
  app: {
    fromDate: Date,
    tillDate: Date
  }
}

class DataVis extends React.Component<Props> {

  async componentDidMount() {

    const queryVariables = {
      from: this.props.app.fromDate,
      till: this.props.app.tillDate
    };

    try {

      const gqlData = await fetchQuery(environment, keplerQuery, queryVariables);

      const resp = await fetch(gqlData.keplerDataUrl);
      const tlvTrips = await resp.text();
      //console.log(tlvTrips);

      const data = Processors.processCsvData(tlvTrips);

      // Create dataset structure
      const dataset = {
        data,

        info: {
          // `info` property are optional, adding an `id` associate with this dataset makes it easier
          // to replace it later
          id: 'my_data'
        }
      };

      // addDataToMap action to inject dataset into kepler.gl instance
      this.props.keplerGlDispatch(addDataToMap({
      //this.props.dispatch(addDataToMap({
                                        datasets: dataset,
                                        options: {
                                          centerMap: true,
                                          readOnly: false
                                        },
                                        config: tlvConfig
                                      })
                        );
    } catch( err ) {
        console.log(err);
    }

  }

  render() {

    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: '70vh'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

};

const mapStateToProps = state => state;
const dispatchToProps = (dispatch, props) => ({
  dispatch,
  keplerGlDispatch: forwardTo('map', dispatch)
});

export default connect(mapStateToProps, dispatchToProps)(DataVis);
