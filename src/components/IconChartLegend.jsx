// @flow
import React from 'react';
// core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LegendItemIcon from "@material-ui/icons/FiberManualRecord";

//import chartStyles from '../assets/css/charts.css';
//import nativeCSS from 'native-css';

import pieSliceColors from './pieSliceColors.json';

type Props = {
  data: String[]
};

const IconChartLegend = (props: Props) => (
    <List style={{display: 'flex',
                  float: 'left',
                  width: '100%'}}>
      {
        props.data.map( (label,index) => {

          const colorsLength =  pieSliceColors.slices.length;
          const sliceColor =  pieSliceColors.slices[index%colorsLength].color;
          return (
            <ListItem key={index}>
                <LegendItemIcon style = {
                                        {color: sliceColor}
                                        }/>
                  <div>{label}</div>
            </ListItem>
          )
        })
      }
    </List>

)

export default IconChartLegend;
