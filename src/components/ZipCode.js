import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ZipCode.css';

class ZipCode extends Component {
  state = {
    zip: '',
    error: ''
  };

  static propTypes = {
    sendZip: PropTypes.func.isRequired
  };

  handleChange = e => {
    if (
      isNaN(+e.target.value[e.target.value.length - 1]) &&
      e.target.value.length >= 1
    )
      this.setState({ error: 'Only digits allowed' });
    else this.setState({ zip: e.target.value, error: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.zip.length < 5) this.setState({ error: 'Needs 5 digits' });
    else {
      this.props.sendZip(this.state.zip);
      this.setState({ zip: '', error: '' });
    }
  };

  render() {
    return (
      <div className="zip-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter ZIP Code"
            maxLength="5"
            value={this.state.zip}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={this.state.zip.length < 5}>
            Get
          </button>
        </form>
        {this.state.error}
      </div>
    );
  }
}

export default ZipCode;
