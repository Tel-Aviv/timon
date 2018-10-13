// @flow
import React from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';

// Sample data
import tlvTrips from '../data/tlv-trips.csv';
import tlvConfig from '../data/tlv-config.json';

const MAPBOX_TOKEN = process.env.MapboxAccessToken;

class DataVis extends React.Component<{}> {

  componentDidMount() {
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
    this.props.dispatch(addDataToMap({
                                      datasets: dataset,
                                      config: tlvConfig
                                    })
                      );

    // Test
    // retrieve kepler.gl store
    const {keplerGl} = this.props;
    // retrieve current kepler.gl instance store
    const {map} = keplerGl;

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
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(DataVis);
