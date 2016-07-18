import React from "react";

// VComponents
import { VictoryLine, VictoryLabel, VictoryChart } from "victory";

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Welcome here!!!</h1>
        <VictoryLine
    data={[
      {x: 0, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 2},      
      {x: 3, y: 4},
      {x: 4, y: 3},
      {x: 5, y: 5}
    ]}
 />
       <VictoryChart>
  <VictoryLine
    y={(data) => 0.5 * data.x * data.x}/>
</VictoryChart>

      </div>
    )
  }
}


