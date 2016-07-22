import React from 'react';


export default class Card extends React.Component {
  render () {
    console.log(this.props.amount);
    return (
      <div>
      <div className="card">
        <div className="card-header">
          World Population in
        </div>
        <div className="card-block">
          <h2 className="card-title">{this.props.amount}</h2>
        </div>
      </div>
      </div>
    )
  }
}