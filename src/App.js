import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Break from "./components/Break.jsx";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  // reference to audio
  const audioElement = useRef(null);
  // create and initialise a breakLength/sessionLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is breakLength/sessionLength and second is setBreakLength/
  // setSessionLength variable
  // set default as 5mins (300(sec) = 5(min) x 60(secs))
  const [breakLength, setBreakLength] = useState(300);
  // set default as 25mins
  const [sessionLength, setSessionLength] = useState(60 * 25);

  // create and initialise flag variable to track whether it's a session or break
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  // intervalId set to null as timer not started
  const [intervalId, setIntervalId] = useState(null);
  // initialise time left state to be session length
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // function which takes in a callback that is called whenever a variable that you are
  // listening on changes. In this instance, change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
    // array is dependency list with all vairables we're listening on
  }, [sessionLength]);

  // ------------------------ BREAK ------------------------ //
  // function which decrements the breakLength by 1 min
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;

    // BreakLength should not be less than 0
    // if less  than 0, set to 0
    if (newBreakLength < 0) {
      setBreakLength(0);
    } else {
      // otherwise, decrement time by 60sec
      setBreakLength(newBreakLength);
    }
  };

  // function which increments the breakLength by 1 min
  const incrementBreakLengthByOneMinute = () => {
    setBreakLength(breakLength + 60);
  };

  // ------------------------ SESSION ------------------------ //
  // function which decrements the sessionLength by 1 min
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;

    // SessionLength should not be less than 0
    // if less than 0, set to 0
    if (newSessionLength < 0) {
      setSessionLength(0);
    } else {
      // otherwise, decrement time by 60sec
      setSessionLength(newSessionLength);
    }
  };

  // function which increments the sessionLength by 1 min
  const incrementSessionLengthByOneMinute = () => {
    setSessionLength(sessionLength + 60);
  };

  // ------------------------ TIMER ------------------------ //
  // if the clock is running intervalId should not be null
  const isTimeStarted = intervalId != null;
  // function which deals with the start and stop buttons
  const handleStartStopClick = () => {
    // if timer is running, allow timer to be stopped by clearing the intervalId which
    // stops the function from calling and set interval to null
    if (isTimeStarted) {
      clearInterval(intervalId);
      setIntervalId(null);

      // else in stop mode, allow the timer to be started and do usual funtion
    } else {
      // setInterval function takes funtion (prevTimeLeft) as 1st param and number in ms
      // (1000) as 2nd param. Number in ms determines how often function in 1st param is
      // called
      const newIntervalId = setInterval(() => {
        // initialise setTimeLeft variable
        setTimeLeft((prevTimeLeft) => {
          // decrement the time by 1
          const newTimeLeft = prevTimeLeft - 1;
          // only want time to be deducted when time is greater than equal to 0
          if (newTimeLeft >= 0) {
            return prevTimeLeft - 1;
          }
          audioElement.current.play();
          // if it's a session, switch to break and setTimeLeft to breakLength
          if (currentSessionType == "Session") {
            setCurrentSessionType("Break");
            setTimeLeft(breakLength);

            // if break, switch to session, switch to session and setTimeLeft to sessionLength
          } else if (currentSessionType == "Break") {
            setCurrentSessionType("Session");
            setTimeLeft(sessionLength);
          }
        });
        // decrement timeLeft by 1 every second (1000ms)
      }, 1000);
      // new interval get set as the id
      setIntervalId(newIntervalId);
    }
  };

  // ------------------------ RESET ------------------------ //
  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    // stop timer by clearing the timeout interval
    clearInterval(intervalId);
    // set intervalId to null to show no timer is running
    setIntervalId(null);
    // set sessionType to 'Session'
    setCurrentSessionType("Session");
    // reset the sessionLength to 25 mins
    setSessionLength(60 * 25);
    // reset breakLength to 5 mins
    setBreakLength(60 * 5);
    // reset timer to 25 mins (initial session length)
    setTimeLeft(60 * 25);
  };

  return (
    <div className="App">
      {/* construct variables to pass in Break.jsx component */}
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      />
      <TimeLeft
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isTimeStarted ? "Stop" : "Start"}
        timeLeft={timeLeft}
      />
      {/* construct variables to pass in Session.jsx component */}
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
