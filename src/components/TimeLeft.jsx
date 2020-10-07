import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { useState, useEffect } from "react";

// to setup , call setup function and pass moment package
momentDurationFormatSetup(moment);

const TimeLeft = ({ sessionLength }) => {
  // initialise time left state to be session length
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // change timeLeft whenever sessionLength changes
  // function which takes in a callback that is called whenever a variable that you are
  // listening on changes.
  useEffect(() => {
    setTimeLeft(sessionLength);

    // array is dependency list with all vairables we're listening on
  }, [sessionLength]);

  // set format to MM:SS
  const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss");

  return (
    <div>
      <p id="timer-label">Time Left</p>
      <p id="time-left">{formattedTimeLeft}</p>
    </div>
  );
};

export default TimeLeft;
