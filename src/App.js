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
let stage;
class Timer extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        time: 60 * 0.1,
        isPause: false,
        phase: 1,
      };
  }

  startTimer() {
    stage = this.state.phase;
    if (this.state.isPause) {
      seconds = this.state.time;
      timer = (function () { return; })();
    } else {
      seconds = 60 * 0.1;
    }

    if(!timer) {
      timer = setInterval(() => {
        if (stage === 4) {
          stage = 0; // reset
        }

        if (seconds <= 0) {
          this.setState({
            time: 0,
            phase: stage + 1,
          });
        }

        seconds = seconds - 1;
        this.setState({
          time: seconds,
          isPause: false,
        });
      }, 1000);
    }
    // if condition then set to stage 2

  }

  stopTimer() {
    if (!this.state.isPause) {
      clearInterval(timer);

      this.setState({
        time: this.state.time,
        isPause: true,
      })
    }
  }
  
  reset() {
    clearInterval(timer);
    timer = (function () { return; })();
    this.setState({
      time: 24 * 60,
      isPause: false,
    })
  }
  // toggle button
    render() {
      return (
      <div>
      Phase
      <p>{this.state.phase}</p>
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
