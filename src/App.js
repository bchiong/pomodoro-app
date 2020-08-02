import React from 'react';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { CircularProgress } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
let stage = 0;
let minutes;
class Timer extends React.Component {
  constructor(props) {

    super(props);
      this.state = {
        time: 60 * 24,
        isPause: false,
        phase: 0,
      };
  }

  startTimer() {
    stage = this.state.phase;
    minutes = getTimeLimit(this.state.phase);
    if (this.state.isPause) {
      seconds = this.state.time;
      timer = (function () { return; })();
    } else {
      seconds = 60 * minutes;
    }

    if(!timer) {
      timer = setInterval(() => {
        if (stage === 7) {
          stage = 0; // reset
        }

        // break
        if (seconds < 0) {
          this.setState({
            time: 0,
            phase: stage + 1,
          });
          clearInterval(timer);
          timer = (function () { return; })();
        }

        seconds = seconds - 1;

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
      const phases = ['1', 'Rest', '2', 'Rest', '3', 'Rest', '4', 'End'];
      return (
      <div>
<Paper elevation={1} />
Phase
      <p>{this.state.phase}</p>
      <p>{phases[this.state.phase]}</p>

      <CircularProgress variant="static" value={calculatePercentage(this.state.time, 24 * 60)} >
      <p>{secondsToHms(this.state.time)}</p>
      </CircularProgress>
      <Fab onClick={() => this.startTimer()} color="primary" aria-label="play">
        <PlayArrowIcon></PlayArrowIcon>
      </Fab>
      <Fab onClick={() => this.stopTimer() } color="primary" aria-label="play">
        <StopIcon></StopIcon>
      </Fab>
      <Button onClick={() =>  this.reset()} variant="contained" color="primary">Reset</Button>
<Paper />

      </div>
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

function getTimeLimit(stage) {
  if (stage % 2 === 0) {
    return 24;
  } else {
    return 5;
  }
}

function calculatePercentage(duration, limit) {
  return (duration / limit) * 100; 
}

export default App;
