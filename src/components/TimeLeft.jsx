import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { useState, useEffect } from "react";

// to setup , call setup function and pass moment package
momentDurationFormatSetup(moment);

const TimeLeft = ({ sessionLength, breakLength }) => {
  // create and initialise flag variable to track whether it's a session of break
  const [currentSessionType, SetCurrentSessionType] = useState("Session");
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
          // if it's a session, switch to break and setTimeLeft to breakLength
          if (currentSessionType == "Session") {
            SetCurrentSessionType("Break");
            setTimeLeft(breakLength);

            // if break, switch to session, switch to session and setTimeLeft to sessionLength
          } else if (currentSessionType == "Break") {
            SetCurrentSessionType("Session");
            setTimeLeft(sessionLength);
          }
        });
        // decrement timeLeft by 1 every second (1000ms)
      }, 1000);
      // new interval get set as the id
      setIntervalId(newIntervalId);
    }
  };

  // set format to MM:SS
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <p id="timer-label">{currentSessionType}</p>
      <p id="time-left">{formattedTimeLeft}</p>
      {/* if in start mode, show Stop in button, otherwise in stop mode so show Start */}
      <button onClick={handleStartStopClick}>
        {isTimeStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default TimeLeft;
