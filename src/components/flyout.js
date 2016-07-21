import React from 'react';
import {VictoryLabel} from 'victory';

export default class Flyout extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool
  };

  getFlyoutPath(props) {
    //console.log(props);
    const padding = -2;
    const size = 10;
    const y = props.y + padding;
    const x = props.x;
    const height = (size / 2 * Math.sqrt(3));
    return `M ${x - 10}, ${y + 1}
      A ${size} ${size - 3} 0 0 1 ${x + size + 10}, ${y - size}
      L ${x + size}, ${y - size}
      L ${x}, ${y + height}
      z`;
  }

  render() {
    //console.log(this.props.text);
    const path = this.getFlyoutPath(this.props);
    const pathStyle = {stroke: "teal", fill: "teal"};
    const group = (
      //<path d={path} style={pathStyle}/>
      <g>
        <path style={pathStyle}/>
        <VictoryLabel {...this.props}/>
      </g>
    );
    return this.props.active ? group : null;
  }

}