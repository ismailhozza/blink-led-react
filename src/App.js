import axios from 'axios';
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import './App.css';

const BASE_URL = "http://192.168.43.25:3000";
const INTERVAL = 20;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null,
      style: "primary"
    };
  }

  handleClick = () => {
    let newState = null;
    let newStyle = "success";
    if (this.state.state === null) {
      newState = "on";
      newStyle = "success";
    } else {
      newState = (this.state.state === "on") ? "off" : "on";
    }
    newStyle = (newState === "on") ? "danger": "success";
    axios.post(`${BASE_URL}/api/blink`, {state: newState})
    .then((res) => {
      this.setState({state: newState, style: newStyle});

    })
  }


  handleUp = () => {
    axios.get(`${BASE_URL}/api/delay`)
    .then((response) => {
      console.log(response.data);
      const delay = response.data.delay;
      console.log(delay);
      return axios.post(`${BASE_URL}/api/delay`, {delay: delay+INTERVAL})
    })
    .then((resp) => {
      console.log(`Delay increased by ${INTERVAL}`);
    })
  }


  handleDown = () => {
    axios.get(`${BASE_URL}/api/delay`)
    .then((response) => {
      console.log(response.data);
      const delay = response.data.delay;
      console.log(delay);
      return axios.post(`${BASE_URL}/api/delay`, {delay: delay-INTERVAL})
    })
    .then((resp) => {
      console.log(`Delay decreased by ${INTERVAL}`);
    })
  }

  render() {
    const text = this.state.state === "on" ? "Stop led" : "Blink led";
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Led blinking</h1>
        </header>
        <div className="App-intro">
          <Button
            bsSize="large"
            bsStyle={this.state.style}
            onClick={this.handleClick}>
              {text}
          </Button>
          <br />
          <br />
          <ButtonGroup>
            <Button onClick={this.handleUp}>
              <Glyphicon glyph="glyphicon glyphicon-upload" />
            </Button>
            <Button onClick={this.handleDown}>
              <Glyphicon glyph="glyphicon glyphicon-download" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default App;
