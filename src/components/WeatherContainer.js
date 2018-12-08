import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getLocationWeather from '../weatherAPI';
import ConditionImage from './ConditionImage';
import spinner from './spinner.gif';

class WeatherContainer extends Component {
  state = {
    weather: {},
    location: {},
    loading: true,
    error: ''
  };

  static propTypes = {
    zip: PropTypes.string
  };

  componentDidMount() {
    getLocationWeather(this.props.zip).then(data =>
      this.setState({
        weather: data.weather,
        location: data.location,
        loading: false,
        error: data.weather.error || data.location.error || null
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
          loading: false,
          error: data.weather.error || data.location.error || null
        })
      );
    }
  }

  render() {
    const { weather, location, loading, error } = this.state;
    return (
      <div>
        {loading && <img src={spinner} alt="Loading" />}
        {error && <h3>{error}</h3>}
        {this.props.zip && !loading && !error && (
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
