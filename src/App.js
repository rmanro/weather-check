import React, { Component } from 'react';
import ZipCode from './components/ZipCode';
import './App.css';

class App extends Component {
  state = {
    zip: null
  };

  handleZip = zip => {
    this.setState({ zip });
  };

  render() {
    return (
      <div className="App">
        <ZipCode sendZip={this.handleZip} />
        {this.state.zip ? <p>Zip Code Submitted: {this.state.zip}</p> : ''}
      </div>
    );
  }
}

export default App;
