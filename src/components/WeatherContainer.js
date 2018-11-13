import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getLocationWeather from '../weatherAPI';

class WeatherContainer extends Component {
  state = {
    weather: {},
    location: {}
  };

  static propTypes = {
    zip: PropTypes.string
  };

  componentDidMount() {
    getLocationWeather(this.props.zip)
      .then(weather => this.setState({ weather: weather.weather, location: weather.location }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.zip !== prevProps.zip) {
      getLocationWeather(this.props.zip)
        .then(weather => this.setState({ weather: weather.weather, location: weather.location }))
    }
  }

  render() {
    return (
      <div>WeatherContainer {this.props.zip && `Zip: ${this.props.zip}`}
      <p>{this.state.weather.temperature}</p>
      </div>
    );
  }
}

export default WeatherContainer;
