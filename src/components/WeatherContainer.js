import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getLocationWeather from '../weatherAPI';
import ConditionImage from './ConditionImage';
import spinner from './spinner.gif';

class WeatherContainer extends Component {
  state = {
    weather: {},
    location: {},
    loading: true
  };

  static propTypes = {
    zip: PropTypes.string
  };

  componentDidMount() {
    getLocationWeather(this.props.zip).then(data =>
      this.setState({
        weather: data.weather,
        location: data.location,
        loading: false
      })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.zip !== prevProps.zip) {
      this.setState({ loading: true });
      getLocationWeather(this.props.zip).then(data =>
        this.setState({
          weather: data.weather,
          location: data.location,
          loading: false
        })
      );
    }
  }

  render() {
    const { weather, location } = this.state;
    return (
      <div>
        {this.state.loading && <img src={spinner} alt="Loading" />}
        {this.props.zip && !this.state.loading && (
          <div>
            <p>
              {location.city}, {location.state}
            </p>
            <p>{weather.temperature}</p>
            <p>{weather.condition}</p>
            <ConditionImage condition={weather.condition} />
          </div>
        )}
      </div>
    );
  }
}

export default WeatherContainer;
