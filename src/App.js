import React, { Component } from 'react';
import './App.css';
import logo from './2_experience_black.png';

class App extends Component {

  constructor(props) {
    super(props);

    this.interval = null;
    this.challenge = 'The quick brown fox jumps over the lazy dog';
    this.localStorageName = 'typochallenge';

    if(!this.getWorldRecord()) {
      this.saveWorldRecord(60000);
    }

    this.state = {
      time: 0,
      worldRecord: this.getWorldRecord(),
      newWorldRecord: false
    }
  }

  start() {
    console.log('start');
    this.interval = setInterval(() => this.tick(), 10);
  }

  stop() {
    console.log('stop');
    clearInterval(this.interval);

    if(this.state.time < this.state.worldRecord) {
      console.log('wr');
      this.saveWorldRecord(this.state.time);
      this.setState({
        worldRecord: this.state.time,
        newWorldRecord: true
      });
    }
  }

  reset() {
    console.log('reset');
    this.interval = null;
    this.setState({
      time: 0,
      newWorldRecord: false
    });
  }

  tick() {
    console.log('tick');
    this.setState(prevState => ({
      time: prevState.time + 1
    }));
  }

  saveWorldRecord(time) {
    localStorage.setItem(this.localStorageName, time);
  }

  getWorldRecord() {
    let wr = localStorage.getItem(this.localStorageName);
    return !wr ? null : wr;
  }

  formatTime(time) {
    let multiplier = 60;

    let minutes = Math.floor(time / (60 * multiplier));
    let seconds = Math.floor((time - (minutes * 60 * multiplier)) / 60);
    let centiseconds = (time - (seconds * 60) - (minutes * 60 * multiplier)) % multiplier;

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    if (centiseconds < 10) centiseconds = `0${centiseconds}`;

    return `${minutes}:${seconds}:${centiseconds}`;
  }

  handleOnChange(event) {
    if(!this.interval) {
      this.start();
    }
    
    if(event.target.value === this.challenge) {
      this.stop();
    }
  }

  render() {
    return (
      <div className="app">
        <div className="logo">
          <img src={logo} alt="knowit" />
        </div>
        {this.state.newWorldRecord ? (
          <div className="new-world-record">
            NEW WORLD RECORD!
          </div>
        ):null}
        <div className="display">
          <div className="display__time">
            {this.formatTime(this.state.time)}
          </div>
          
          <div className="display__world-record">
            World record: {this.formatTime(this.state.worldRecord)}
          </div>
        </div>
        
        <div className="challenge">
          <div className="challenge__description">Skriv meningen så snabbt som möjligt</div>
          <div className="challenge__sentence">{this.challenge}</div>
        </div>
        <div className="input">
          <input type="text" 
            ref="answer" 
            value={this.state.answer}
            spellCheck="false"
            onChange={(event) => this.handleOnChange(event)} />
        </div>
        
      </div>
    );
  }
}

export default App;
