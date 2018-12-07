import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConditionImage extends Component {
  static propTypes = {
    condition: PropTypes.string
  };

    conditionMap = {
      'Overcast': 'https://icons.wxug.com/i/c/i/cloudy.gif',
      'Partly Cloudy': 'https://icons.wxug.com/i/c/i/partlycloudy.gif',
      'Sunny': 'https://icons.wxug.com/i/c/i/sunny.gif',
      'Clear': 'https://icons.wxug.com/i/c/i/clear.gif'
    }
  
  render() { 
    return ( 
      <div>
        <img src={this.conditionMap[this.props.condition]} alt={this.props.condition}/>
      </div>
     );
  }
}
 
export default ConditionImage;