import React from "react";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { CircularProgress, Typography, Box, AppBar, IconButton, Toolbar } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MenuIcon from '@material-ui/icons/Menu';

import "./App.css";

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
      time: 60 * 25,
      isPause: false,
      phase: 0,
      showPause: false,
    };
  }

  startTimer() {
    stage = this.state.phase;
    minutes = getTimeLimit(this.state.phase);
    if (this.state.isPause) {
      seconds = this.state.time;
      timer = (function () {
        return;
      })();
    } else {
      seconds = 60 * minutes;
    }

    if (!timer) {
      this.setState({
        showPause: true,
      });
      timer = setInterval(() => {
        if (stage === 6) {
          stage = 0; // reset
        }
        if (seconds < 0) {
          clearInterval(timer);
          this.setState({
            time: getTimeLimit(stage + 1) * 60,
            phase: stage + 1,
          });
          timer = (function () {
            return;
          })();
        } else {
          this.setState({
            time: seconds,
            isPause: false,
          });
        }
        seconds = seconds - 1;
      }, 1000);
    }
  }

  stopTimer() {
    if (!this.state.isPause) {
      clearInterval(timer);

      this.setState({
        time: this.state.time,
        isPause: true,
        showPause: false
      });
    }
  }

  reset() {
    clearInterval(timer);
    timer = (function () {
      return;
    })();
    this.setState({
      time: getTimeLimit(this.state.phase) * 60,
      isPause: false,
    });
  }
  // toggle button
  render() {
    const phases = ["Focus", "Rest", "Focus", "Rest", "Focus", "Rest", "Focus"];
    return (
      <div>
      <AppBar position="static">
  <Toolbar variant="dense">
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="inherit">
      Pomodoro Timer <span role="img" aria-label="tomato emoji">🍅</span>
    </Typography>
  </Toolbar>
</AppBar>

<Box
        m={2} pt={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
        <Stepper activeStep={this.state.phase} alternativeLabel>
          {phases.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
          </Box>
        <Box 
        m={2} pt={1}
        position="relative" display="inline-flex">
          <CircularProgress
            size={300}
            variant="static"
            value={calculatePercentage(
              this.state.time,
              getTimeLimit(this.state.phase) * 60
            )}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" component="div">
              {secondsToHms(this.state.time)}
            </Typography>
          </Box>
        </Box>
        <Box
        m={2} pt={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
        {!this.state.showPause && (
          <Box m={1} pt={1}>
            <Fab
              onClick={() => this.startTimer()}
              color="primary"
              aria-label="play"
            >
              <PlayArrowIcon></PlayArrowIcon>
            </Fab>
          </Box>
        )}
        {this.state.showPause && (
          <Box m={1} pt={1}>
            <Fab
              margin={10}
              onClick={() => this.stopTimer()}
              color="primary"
              aria-label="stop"
            >
              <PauseIcon></PauseIcon>
            </Fab>
          </Box>
        )}

          <Box m={1} pt={1}>
            <Button
              onClick={() => this.reset()}
              variant="contained"
              color="secondary"
            >
              Reset
            </Button>
          </Box>
        </Box>
              <small>Based on the <a target="_blank" rel="noopener noreferrer" href="https://francescocirillo.com/pages/pomodoro-technique">Pomodoro Technique</a></small>
        {this.state.phase === 6 && <p>Well Done!</p>}
      </div>
    );
  }
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " min " : " min ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
  return hDisplay + mDisplay + sDisplay;
}

function getTimeLimit(stage) {
  if (stage % 2 === 0) {
    return 25;
  } else {
    return 5;
  }
}

function calculatePercentage(duration, limit) {
  return (duration / limit) * 100;
}

export default App;
