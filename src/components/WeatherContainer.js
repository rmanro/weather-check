import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getLocationWeather from '../weatherAPI';
import ConditionImage from './ConditionImage';

class WeatherContainer extends Component {
  state = {
    weather: {},
    location: {}
  };

  static propTypes = {
    zip: PropTypes.string
  };

  componentDidMount() {
    getLocationWeather(this.props.zip).then(data =>
      this.setState({ weather: data.weather, location: data.location })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.zip !== prevProps.zip) {
      getLocationWeather(this.props.zip).then(data =>
        this.setState({ weather: data.weather, location: data.location })
      );
    }
  }

  render() {
    const { weather, location } = this.state;
    return (
      <div>
        WeatherContainer {this.props.zip && `Zip: ${this.props.zip}`}
        <p>{location.city}, {location.state}</p>
        <p>{weather.temperature}</p>
        <p>{weather.condition}</p>
        <ConditionImage condition={weather.condition}/>
      </div>
    );
  }
}

export default WeatherContainer;
