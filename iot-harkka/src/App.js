import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
import logo from './logo.svg';
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("randomData", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />    
            <div className="App-div" style={{ textAlign: "center", fontSize : 64}}>
              <p className="App-para">Data generaattorin tuottama data</p>
              {response?  <p className="App-data"> {response}</p>:<p>Waiting for data</p>}
              <a className="App-link" href="https://reactjs.org" target ="_blank" rel="noopener noreferrer">Learn React</a>
            </div>
        </header>
      </div>
    );
  }
}
export default App;
