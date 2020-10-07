import React, { useState } from "react";
import "./App.css";
import Break from "./components/Break.jsx";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  // BREAK //
  // create and initialise a breakLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is breakLength and second is setBreakLength variable
  // set default as 5mins (300(sec) = 5(min) x 60(sec))
  const [breakLength, setBreakLength] = useState(300);

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

  // SESSION //
  // set default as 25mins
  const [sessionLength, setSessionLength] = useState(60 * 25);

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

  return (
    <div className="App">
      {/* construct variables to pass in Break.jsx component */}
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      />
      <TimeLeft sessionLength={sessionLength} />
      {/* construct variables to pass in Session.jsx component */}
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      {/*
      <innerText id="timer-label">Session</innerText>
      <p id="time-left"></p>
      <button id="start_stop">Start</button>
      <button id="reset">Reset</button> */}
    </div>
  );
}

export default App;
