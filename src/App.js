import React, { Component } from 'react';
import './App.css';
import logo from './2_experience_black.png';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveName = this.saveName.bind(this);
    this.cancel = this.cancel.bind(this);

    this.interval = null;
    this.challenge = 'The quick brown fox jumps over the lazy dog';
    this.localStorageName = 'typochallenge';
    this.localStorageWorldChampion = 'championName';

    if(!this.getWorldRecord()) {
      this.saveWorldRecord(60000);
    }

    if(!this.getWorldChampionName()){
      this.saveWorldChampionName("Micke");
    }

    this.state = {
      time: 0,
      worldRecord: this.getWorldRecord(),
      newWorldRecord: false,
      playerName: this.getWorldChampionName()
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

  saveWorldChampionName(name){
    localStorage.setItem(this.localStorageWorldChampion, name);
  }

  getWorldChampionName(){
    let wc = localStorage.getItem(this.localStorageWorldChampion);
    return wc ? wc : null;
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
    if(event.target.value === 'clearcacheplz'){
      localStorage.clear();
      console.log('Cleared localstorage');
      window.location.reload();
    }
    if(event.target.value === this.challenge) {
      this.stop();
    }
  }

  saveName(){
    this.saveWorldChampionName(this.state.playerName);
    window.location.reload();
  }

  cancel(){
    this.saveWorldChampionName('Unknown player');
    window.location.reload();
  }

  handleNameChange(e){
    this.setState({playerName: e.target.value});
  }

  render() {
    return (
      <div className="app">
      {this.state.newWorldRecord ? (
          <div id="popup">
            <div id="enter-name">
                <label>Ange ditt namn:</label>
                <input name="name" type="text" spellCheck="false" autoComplete="off" onChange={this.handleNameChange}/>
                <input type="button" value="Save" onClick={this.saveName}/>
                <input type="button" value="Cancel" onClick={this.cancel}/>
            </div>
          </div>
        ):null}
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
            World record: {this.state.playerName} {this.formatTime(this.state.worldRecord)}
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
