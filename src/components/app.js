import React from 'react';
import countries from '../countries.json';
import population from '../population.json';
import Flyout from './flyout';
import LineChart from './linechart';
import Select from 'react-select';
import Card from './card';

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
      worldPopul: 0,
      countryPolul: 0,
      graphData: this._getGraphData(
                  this._getObjectDataToArray(population[0]),
                  this._getObjectDataToArray(this._getCountryData())
                 )
    }
  }

  componentDidMount() {
    this.setState({
      worldPopul: this._currentTotalPopulation(population)
    });
  }
  
  _getCountryData(countryCode = 'ABW') {
    return population.find(country => {
      return country.FIELD2 === countryCode
    })
  }

  _getCountiesData(population, field) {
    return population.map(country => {
      return country[field];
    }).slice(1);
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


  _logChange(val) {
    console.log("Selected: " + val);
    console.log(this._getObjectDataToArray(population[0]));
    this.setState({
      graphData:  this._getGraphData(
                    this._getObjectDataToArray(population[0]),
                    this._getObjectDataToArray(this._getCountryData(val))
                  )
    });
  }

  // populate array of object with properties value and label
  // [
  //   { value: 'IRL', label: 'Ireland' },
  //   { value: 'CAN', label: 'Canada' }
  // ]  
  _selectOptionData() {
    //console.log(this._getCountiesData(population, "FIELD2"));
    let data = this._getCountiesData(population, "FIELD2").map(country => {
      return {value: country}
    });
    
    let dataName = this._getCountiesData(population, "FIELD1");
    data.map((country,index) => {
      return data[index].label = dataName[index];
    });
    //console.log(data);
    return data;
  }

  render () {
    var options = this._selectOptionData();
    //console.log(this._selectOptionData());

    return (
      <div className="container main">
        <h1>World population</h1>
          <div className="">
            <Card 
              amount={this.state.worldPopul.toLocaleString()}
            />
          </div>

          <Select
            name="form-field-name"
            maxHeight="300"
            value="Select Country"
            placeholder="Select Country"
            options={options}
            onChange={this._logChange.bind(this)}
          />

          <LineChart 
            data={this.state.graphData}
            countryData={this._getObjectDataToArray(this._getCountryData())}
          />


          
      

      </div> 
      
    )
  }
}


