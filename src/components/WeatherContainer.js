import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeatherContainer extends Component {
  state = {};

  static propTypes = {
    zip: PropTypes.string
  };

  render() {
    return (
      <div>WeatherContainer {this.props.zip && `Zip: ${this.props.zip}`}</div>
    );
  }
}

export default WeatherContainer;
