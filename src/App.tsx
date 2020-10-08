import React, { useState, useEffect, useRef } from "react";
import "./assets/main.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  // react reference to audio
  const audioElement = useRef<HTMLAudioElement>(null);
  // create and initialise a breakLength/sessionLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is breakLength/sessionLength and second is setBreakLength/
  // setSessionLength variable
  // set default as 5mins
  const [breakLength, setBreakLength] = useState(60 * 5);
  // set default as 25mins
  const [sessionLength, setSessionLength] = useState(60 * 25);

  // create and initialise flag variable to track whether it's a session or break
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  // intervalId set to null as timer not started.
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // initialise time left state to be session length
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // function which takes in a callback that is called whenever a variable that you are
  // listening on changes. In this instance, change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
    // array is dependency list with all vairables we're listening on
  }, [sessionLength]);

  // listen to timeLeft changes
  useEffect(() => {
    // if it is 0
    if (timeLeft === 0) {
      // play the audio, use of optional chaining (?) to say that if it's null,
      // don't run it, otherwise continue to run the code below it
      audioElement?.current?.play();
      // if it's a session, switch to break and setTimeLeft to breakLength
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
        // if break, switch to session, switch to session and setTimeLeft to sessionLength
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  // ------------------------ BREAK ------------------------ //
  // function which decrements the breakLength by 1 min
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    // only initialise setBreakLength if newSetBreakLength is more than 0
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  // function which increments the breakLength by 1 min
  const incrementBreakLengthByOneMinute = () => {
    // break cannot go over 60
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  // ------------------------ SESSION ------------------------ //
  // function which decrements the sessionLength by 1 min
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    // only initialise setSessionLength if newSetSessionLength is more than 0
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  // function which increments the sessionLength by 1 min
  const incrementSessionLengthByOneMinute = () => {
    // session cannot go over 60
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(sessionLength + 60);
    }
  };

  // ------------------------ TIMER ------------------------ //
  // if the clock is running intervalId should not be null
  const isTimeStarted = intervalId != null;
  // function which deals with the start and stop buttons
  const handleStartStopClick = () => {
    // if timer is running, allow timer to be stopped by clearing the intervalId which
    // stops the function from calling and set interval to null
    if (isTimeStarted) {
      // if intervalId exists
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);

      // else in stop mode, allow the timer to be started and do usual funtion
    } else {
      // setInterval function takes funtion (prevTimeLeft) as 1st param and number in ms
      // (1000) as 2nd param. Number in ms determines how often function in 1st param is
      // called
      const newIntervalId = setInterval(() => {
        // initialise setTimeLeft variable
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        // decrement timeLeft by 1 every second (1000ms)
      }, 1000);
      // new interval get set as the id
      setIntervalId(newIntervalId);
    }
  };

  // ------------------------ RESET ------------------------ //
  const handleResetButtonClick = () => {
    // reset audio
    audioElement?.current?.load();
    // if intervalId exists
    if (intervalId) {
      // stop timer by clearing the timeout interval
      clearInterval(intervalId);
    }
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
    <div className="flex flex-col h-screen items-center bg-indigo-900">
      <h1 className="text-gray-300 font-bold font-clock text-4xl mt-10 mb-20 mr-5">
        Pomodoro Clock
      </h1>
      <div className="flex w-full justify-around">
        {/* construct props to pass in Break.jsx component */}
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        {/* construct props to pass in TimeLeft.jsx component */}
        <TimeLeft
          handleResetButtonClick={handleResetButtonClick}
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isTimeStarted ? "Stop" : "Start"}
          timeLeft={timeLeft}
        />
        {/* construct props to pass in Session.jsx component */}
        <Session
          sessionLength={sessionLength}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        />
      </div>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3"
          type="audio/mpeg"
        />
      </audio>
      <footer className="mt-10 mr-5 text-gray-300 text-xs">
        Made with &#10084; by&nbsp;
        <a href="https://github.com/GabGab-rielle">Gabrielle</a>.
      </footer>
    </div>
  );
}

export default App;
