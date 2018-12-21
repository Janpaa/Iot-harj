import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chart from "react-google-charts";
import './App.css';

// npm install
// npm start

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      response: [],
      endpoint: "http://127.0.0.1:4001",
      data:[
        ['Time', 'CPU usage']
      ]
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("cpu", data1 => this.lisaadata(data1));
    socket.on("mem", data2 => this.setState({ response2: data2 }));
    socket.on("time", data3 => this.setState({ response3: data3 }));
  }
  lisaadata(d){
    var data = this.state.data;
    var counter = this.state.counter;
    if (data.length>60){
      data.splice(1,1);
    }
    counter++;
    this.setState({response1:d});
    var arr = [counter,parseInt(d)];
    this.setState({data:data.concat([arr])})
    this.setState({counter:counter})
    console.log(data);
  }

  render() {
    const { response1 } = this.state;
    const { response2 } = this.state;
    const { response3 } = this.state;
    const {data} = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data = {data}
          options={{
            hAxis: {
              title: 'Time',
            },
            vAxis: {
              title: 'CPU usage',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
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
