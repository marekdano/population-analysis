import React from 'react';
import Select from 'react-select';


export default class Card extends React.Component {
  render () {
    return (
      
      <div className="card">
        <div className="card-header">
          {this.props.title}
          <Select
            name="form-field-name"
            maxHeight="300"
            placeholder="Select Year"
            options={this.props.dataOptions}
            onChange={this.props.update}
            value={this.props.value}
          />    
        </div>
        <div className="card-block">
          <h2 className="card-title">{this.props.amount}</h2>
        </div>
      </div>
    )
  }
}