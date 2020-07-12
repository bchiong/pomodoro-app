import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Timer></Timer>
      </header>
    </div>
  );
}

let timer;
let seconds;
class Timer extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        time: 60 * 24,
        isPause: false,
      };
  }

  startTimer() {
    if (this.state.isPause) {
      seconds = this.state.time;
      console.log('paused time', this.state.time);
      timer = (function () { return; })();
    } else {
      seconds = 60 * 24;
    }
    console.log('timer', timer);
    if(!timer) {
      timer = setInterval(() => {
        seconds = seconds - 1;
        console.log('s', seconds);
        this.setState({
          time: seconds,
          isPause: false,
        });
      }, 1000);
    }

  }

  stopTimer() {
    if (!this.state.isPause) {
      clearInterval(timer);
      console.log('time', this.state.time);
      this.setState({
        time: this.state.time,
        isPause: true,
      })
    }
  }

  reset() {
    clearInterval(timer);
    this.setState({
      time: 24 * 60
    })
  }
  // toggle button
    render() {
      return (
      <div>
      <p>{secondsToHms(this.state.time)}</p>
      <button onClick={() => this.startTimer()}>Start timer</button>
      <button onClick={() => this.stopTimer()}>Stop timer</button>
      <button onClick={() => this.reset()}>Reset</button></div>
);
    }
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay; 
}

export default App;
