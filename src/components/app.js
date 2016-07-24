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
      yearWorldPopul: "Select Year",
      countryPopul: 0,
      yearCountryPopul: "Select Year",
      country: "",
      graphData: this._populateGraphData(
                  this._convertObjectDataToArray(population[0]),
                  this._convertObjectDataToArray(this._getCountryData())
                 )
    }
  }

  componentDidMount() {
    this.setState({
      country: "ABW"
    });
  }


  /*
    Get object of filtered country data  
  
    default: countryCode = "ABW"
             field = "FIELD2"
  */

  _getCountryData(countryCode = "ABW", field = "FIELD2") {
    return population.find(country => {
      return country[field] === countryCode;
    })
  }

  
  /*
    Get array of countries data 
    by filtering a provided field 
  */

  _getCountriesData(population, field) {
    return population.map(country => {
      return country[field];
    }).slice(1);
  }


  /*
    Get the array of years in which the population 
    was stored in following format
    [
      { value: 1960, label: '1960' },
      { value: 1961, label: '1961' }
    ]
  */

  _getYears(obj) {
    const arr = [];
    for(let prop in obj) {
      arr.push({
        value: obj[prop],
        label: obj[prop].toString()
      });
    }
    return arr.slice(4);
  }


  _convertObjectDataToArray(obj) {
    let values = [];
    for(let y in obj) {
      if( Number.isInteger(obj[y]) ) {
        values.push(obj[y])
      }
    }
    return values;
  }

  /* 
    Populate the graph data by creating 
    objects of x-axis and y-axis 
  */

  _populateGraphData(header, countryData) {
    let data = header.map(x => {
      return { x: x };
    });

    countryData.map((int,index) => {
      return data[index].y = int;
    });
    return data;
  }


  /*
    Calculate and return the world population 
    in the provided year
  */

  _worldPopulation(year, population) {
    const field = this._getYearField(year, population[0]);
    
    let countriesPopulation = population.map(country => {
      return Math.floor(country[field]);
    }).slice(1)
    
    return countriesPopulation.reduce((sum,int) => {
      return sum + int;
    }, 0);
  }


  /* 
    Update the graph data with a provided value 
  */

  _updateGraphData(val) {
    if(val != "") {
      this.setState({
        graphData:  this._populateGraphData(
                      this._convertObjectDataToArray(population[0]),
                      this._convertObjectDataToArray(this._getCountryData(val))
                    ),
        country: val
      });
    }
  }


  _updateWorldPopul(year) {
    //console.log(year);
    this.setState({
      worldPopul: this._worldPopulation(year, population),
      yearWorldPopul: year
    });

  }


  _updateCountryPopul(year) {
    console.log(year);
    console.log(this.state.country);
    const countryPopul = this._getCountryData(this.state.country)[this._getYearField(year, population[0])].toLocaleString()

    this.setState({
      countryPopul,
      yearCountryPopul: year
    });

    return 
  }

  _getYearField(year, obj) {
    return Object.keys(obj).find(key => {
      return obj[key] === year;
    });
  }

  /* 
    Populate array of object with properties value and label
  
    [
      { value: 'IRL', label: 'Ireland' },
      { value: 'CAN', label: 'Canada' }
    ]
  */ 

  _selectOptionData() {
    let data = this._getCountriesData(population, "FIELD2").map(country => {
      return {value: country}
    });
    
    let dataName = this._getCountriesData(population, "FIELD1");
    data.map((country,index) => {
      return data[index].label = dataName[index];
    });
  
    return data;
  }


  render () {
    console.log(this.state.yearWorldPopul);
    return (
      <div className="container main">
        <h1>World population</h1>
          <div className="">
            <Card 
              amount={this.state.worldPopul.toLocaleString()}
              dataOptions={this._getYears(population[0])}
              update={this._updateWorldPopul.bind(this)}
              title={"World Population in"}
              value={this.state.yearWorldPopul}
            />
          </div>

          <Select
            name="form-field-name"
            maxHeight="300"
            placeholder="Select Country"
            value={this.state.country}
            options={this._selectOptionData()}
            onChange={this._updateGraphData.bind(this)}
          />
          <Card 
            amount={this.state.countryPopul.toLocaleString()}
            dataOptions={this._getYears(population[0])}
            update={this._updateCountryPopul.bind(this)}
            title={"Country Population in"}
            value={this.state.yearCountryPopul}
          />
    
          <LineChart 
            data={this.state.graphData}
            countryData={this._convertObjectDataToArray(this._getCountryData())}
          />

      </div> 
      
    )
  }
}


