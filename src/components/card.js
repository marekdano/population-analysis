import React from 'react';
import Select from 'react-select';


export default class Card extends React.Component {

  render () {
    const style = {
      cardHeader: { 
        display:"flex", 
        flexDirection: "row",
        justifyContent:"flex-start", 
        alignItems: "center"
      },
      cardSelectBox: {
        marginLeft: "10px", 
        width: "160px"
      }
    }

    return (
      <div className="card">
        <div className="card-header" style={style.cardHeader} >
          <h5  className="text-center">
            {this.props.title}
          </h5>
          <div style={style.cardSelectBox}>
            <Select
              name="form-field-name"
              maxHeight="300"
              placeholder={this.props.placeholder}
              options={this.props.dataOptions}
              onChange={this.props.update}
              value={this.props.value}
            />   
          </div>
        </div>
        <div className="card-block">
          <h2 className="card-title">{this.props.text}</h2>
        </div>
      </div>
    )
  }
}