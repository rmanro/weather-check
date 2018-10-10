import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeatherContainer extends Component {
  state = {};

  static propTypes = {
    zip: PropTypes.string
  };
  
  render() {
    return <div>WeatherContainer</div>;
  }
}

export default WeatherContainer;
