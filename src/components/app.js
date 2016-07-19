import React from 'react';
import countries from '../countries.json';
import population from '../population.json';

// Victory Components
import { VictoryLine, VictoryLabel, VictoryChart } from "victory";

export default class App extends React.Component {
  
  _getCountryData(countryCode = 'SVK') {
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
      return { x: x }
    });

    countryData.map((int,index) => {
      return data[index].y = int
    });
    return data;
  }

  _currentTotalPopulation(population) {
    let countriesPopulation = population.map(country => {
      return country.FIELD60
    }).slice(1)

    console.log(countriesPopulation);

    return countriesPopulation.reduce((sum,int) => {
      return sum + int
    }, 0);
  }

  render () {
    // console.log("Hello World!");
    // console.log(countries[0].name);
    // console.log(population[1].FIELD5)
    // console.log(this._getCountryData()); 
    // console.log(this._getObjectDataToArray(this._getCountryData()));
    // console.log(this._getObjectDataToArray(population[0]));
    // console.log(
    //   this._getGraphData(
    //     this._getObjectDataToArray(population[0]),
    //     this._getObjectDataToArray(this._getCountryData())
    //   )
    // );
    console.log(this._currentTotalPopulation(population));


    return (
      <div>
        <h1>Welcome here!!!</h1>
        <VictoryChart>
        <VictoryLine
          data={
            this._getGraphData(
              this._getObjectDataToArray(population[0]),
              this._getObjectDataToArray(this._getCountryData())
            )
          }
        />
        </VictoryChart>  

        <VictoryChart>
          <VictoryLine
            y={(data) => 1 * data.x * data.x}/>
        </VictoryChart>
      </div>
    )
  }
}


