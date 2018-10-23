// @flow
import React from 'react';
// core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LegendItemIcon from "@material-ui/icons/FiberManualRecord";

import barSliceColors from './barSliceColors.json';

type Props = {
  data: String[]
};

const IconlessChartLegend = (props: Props) => (
    <List style={{display: 'flex',
                  float: 'right'}}>
      {
        props.data.map( (label,index) => {
          const colorsLength = barSliceColors.slices.length;
          const sliceColor =  barSliceColors.slices[index%colorsLength].color;
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
);

export default IconlessChartLegend;
