import React from 'react';
import countries from '../countries.json';
import population from '../population.json';
import Flyout from './flyout';
import LineChart from './linechart';

// Victory Components
import { 
  VictoryLine, 
  VictoryLabel, 
  VictoryChart,
  VictoryScatter,
  VictoryAxis
} from 'victory';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      worldPopul: 0
    }
  }

  componentDidMount() {
    this.setState({
      worldPopul: this._currentTotalPopulation(population)
    });
    console.log(this.state.worldPopul);
    console.log(this._currentTotalPopulation(population));
  }
  
  _getCountryData(countryCode = 'ABW') {
    return population.find(country => {
      return country.FIELD2 === countryCode
    })
  }

  _getObjectDataToArray(obj) {
    let values = []
    for(let y in obj) {
      if( Number.isInteger(obj[y]) ) {
        values.push(obj[y])
      }
    }
    return values;
  }

  _getGraphData(header, countryData) {
    let data = header.map(x => {
      return { x: x };
    });

    countryData.map((int,index) => {
      return data[index].y = int;
    });
    return data;
  }

  _currentTotalPopulation(population) {
    let countriesPopulation = population.map(country => {
      return Math.floor(country.FIELD60);
    }).slice(1)

    return countriesPopulation.reduce((sum,int) => {
      return sum + int;
    }, 0);
  }

  render () {

    return (
      <div className="container main">
        <h1>World population analysis</h1>
          <div className="">
            <div className="card">
              <div className="card-header">
                World Population
              </div>
              <div className="card-block">
                <h2 className="card-title">{this.state.worldPopul.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          <LineChart 
            data={
              this._getGraphData(
                this._getObjectDataToArray(population[0]),
                this._getObjectDataToArray(this._getCountryData())
              )
            }
            countryData={this._getObjectDataToArray(this._getCountryData())}
          />


          
        



      </div> 
      
    )
  }
}


