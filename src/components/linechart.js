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
    const style = {
      chart: {
        parent: { paddingLeft: 40 }
      },
      axis: {
        axis: { 
          stroke: "#756f6a", 
          strokeWidth: 1
        }, 
        grid: { 
          stroke: "grey", 
          opacity: 0.15
        }, 
        ticks: {
          stroke: "grey", 
          strokeWidth: 1
        }, 
        tickLabels: {
          fontSize: 10, 
          fill: "red", 
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
          strokeWidth: 1
        },
        labels: {
          fill: "black",
          padding: 18,
          backgroundColor: "red"
        }
      },
      line: {
        data: {
          stroke: "#822722",
          strokeWidth: 1
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
                          Object.assign({}, props.style, {fill: "teal"})
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