// @flow
import React from 'react';
import Card from "./Card.jsx";
import CardHeader from "./CardHeader.jsx";
import CardIcon from "./CardIcon.jsx";
import CardBody from "./CardBody.jsx";
import { RadialChart, Hint, DiscreteColorLegend, GradientDefs } from 'react-vis';

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

type State = {
  value: boolean
}

class VisChart extends React.Component<Props,State> {

  state = {
    value: false
  }

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

    const ITEMS = [
      {title: 'Dashed', color: "#45aeb1", strokeStyle: "dashed"},
      {title: 'Dasharray', color: '#f93', strokeDasharray: "1 2 3 4 5 6 7"},
      {title: 'Dots', color: 'url(#circles)', strokeWidth: 9}
    ];


    return (<Card>
      <CardHeader title={title}>
        <CardIcon color={color}>
          {this.props.children}
        </CardIcon>
        <div>{title}</div>
      </CardHeader>
      <CardBody>
        <RadialChart
          colorType={'literal'}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          margin={{top: 100}}
          getLabel={d => d.name}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          data={data}
          labelsRadiusMultiplier={1.1}
          labelsStyle={{fontSize: 16, fill: '#222'}}
          showLabels={true}
          style={{stroke: '#fff', strokeWidth: 2}}
          width={400}
          height={300}
          >
            {this.state.value && <Hint value={this.state.value} />}
        </RadialChart>
         <div>
            <svg height={0} width={0}>
              <GradientDefs>
                  <pattern id="stripes" width="4" height="4" patternUnits="userSpaceOnUse">
                      <path d="M 0, 0 l 5, 5" stroke="#45aeb1" strokeLinecap="square" />
                  </pattern>
                  <pattern id="circles" width="3" height="3" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.8" fill="magenta" />
                  </pattern>

              </GradientDefs>
            </svg>
            <DiscreteColorLegend orientation="horizontal" width={300} items={ITEMS} />
        </div>
      </CardBody>
      </Card>)
  }

};

export default VisChart;
