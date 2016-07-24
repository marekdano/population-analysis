import React from 'react';
import countries from '../countries.json';
import population from '../population.json';
import Flyout from './flyout'

// Victory Components
import { 
  VictoryLine, 
  VictoryChart,
  VictoryScatter,
  VictoryAxis
} from 'victory';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const chartLineColor = "#1ABC9C"; 
    const axisColor = "#545454";

    const style = {
      chart: {
        parent: { 
          paddingLeft: 40,
          backgroundColor: "white",
        }
      },
      axis: {
        axis: { 
          stroke: axisColor, 
          strokeWidth: 1
        }, 
        grid: { 
          stroke: "#D3D3D3", 
          opacity: 0.3
        }, 
        ticks: {
          stroke: axisColor, 
          strokeWidth: 1
        }, 
        tickLabels: {
          fontSize: 10, 
          fill: axisColor, 
          padding: 5
        }, 
        axisLabel: {
          fontSize: 16, 
          padding: 20
        }
      },
      scatter: {
        data: {
          stroke: "teal",
          fill: "white",
          strokeWidth: 1.5
        },
        labels: {
          fill: "black",
          padding: 18,
          
        }
      },
      line: {
        data: {
          stroke: chartLineColor,
          strokeWidth: 1.5
        }
      }
    }  

    return(
      <VictoryChart
        animate={{duration: 1000}}
        style={style.chart}
      >
        <VictoryAxis 
          style={style.axis}
        />
        <VictoryAxis dependentAxis
          style={style.axis}
        />
        <VictoryLine
          data={this.props.data}
          width={500}
          height={300}
          standalone={false}
          interpolation={"cardinal"}
          style={style.line}
        />
        <VictoryScatter
          width={500}
          height={300}
          standalone={false}
          style={style.scatter}
          size={2}
          data={this.props.data}
          labels={this.props.countryData}
          labelComponent={<Flyout/>}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        return {active: true};
                      }
                    }, {
                      mutation: (props) => {
                        return { style:
                          Object.assign({}, props.style, {fill: "teal"})
                        };
                      }
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        return {active: false};
                      }
                    }, {
                      mutation: (props) => {
                        return { style:
                          Object.assign({}, props.style, {fill: "white"})
                        };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />
      </VictoryChart>
    )
  }
}