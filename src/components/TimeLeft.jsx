import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { useState } from "react";

// to setup , call setup function and pass moment package
momentDurationFormatSetup(moment);

const TimeLeft = ({ sessionLength }) => {
  // initialise time left state to be session length
  const [timeLeft, setTimeLeft] = useState(sessionLength);

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
