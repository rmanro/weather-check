import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ZipCode extends Component {
  state = {
    zip: '',
    error: ''
  };

  static propTypes = {
    sendZip: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.setState({ zip: e.target.value, error: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.zip.length < 5) this.setState({ error: 'Needs 5 digits' });
    else this.props.sendZip(this.state.zip);
  };

  render() {
    return (
      <div>
        <h2>Enter Zip Code</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="zipcode"
            maxLength="5"
            value={this.state.zip}
            onChange={this.handleChange}
          />
          <button type="submit">Get</button>
        </form>
        {this.state.error}
      </div>
    );
  }
}

export default ZipCode;
