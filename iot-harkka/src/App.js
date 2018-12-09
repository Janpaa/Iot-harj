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
    socket.on("cpu", data1 => this.setState({ response1: data1 }));
    socket.on("mem", data2 => this.setState({ response2: data2 }));
    socket.on("time", data3 => this.setState({ response3: data3 }));
  }
  render() {
    const { response1 } = this.state;
    const { response2 } = this.state;
    const { response3 } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />    
            <div className="App-div" style={{ textAlign: "center", fontSize : 64}}>
              {response3? <p className="App-para">{response3}</p>:<p></p>}
              {response1?  <p className="App-data">CPU {response1}%</p>:<p>Waiting for data</p>}
              {response2?  <p className="App-data">RAM {response2}%</p>:<p>Waiting for data</p>}
              <a className="App-link" href="https://reactjs.org" target ="_blank" rel="noopener noreferrer">Learn React</a>
            </div>
        </header>
      </div>
    );
  }
}
export default App;
