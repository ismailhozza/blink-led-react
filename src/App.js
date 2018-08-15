import axios from 'axios';
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import './App.css';

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
    axios.post('http://192.168.43.25:3000/api/blink', {state: newState})
    .then((res) => {
      this.setState({state: newState, style: newStyle});

    })
  }


  handleUp = () => {
    axios.get('http://192.168.43.25:3000/api/delay')
    .then((response) => {
      console.log(response.data);
      const delay = response.data.delay;
      console.log(delay);
      return axios.post('http://192.168.43.25:3000/api/delay', {delay: delay+10})
    })
    .then((resp) => {
      console.log("Delay increased by 10");
    })
  }


  handleDown = () => {
    axios.get('http://192.168.43.25:3000/api/delay')
    .then((response) => {
      console.log(response.data);
      const delay = response.data.delay;
      console.log(delay);
      return axios.post('http://192.168.43.25:3000/api/delay', {delay: delay-10})
    })
    .then((resp) => {
      console.log("Delay decreased by 10");
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
