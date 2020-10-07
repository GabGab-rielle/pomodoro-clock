import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";

// to setup , call setup function and pass moment package
momentDurationFormatSetup(moment);

const TimeLeft = ({
  timerLabel,
  handleStartStopClick,
  startStopButtonLabel,
  timeLeft,
}) => {
  // set format to MM:SS
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <p id="timer-label">{timerLabel}</p>
      <p id="time-left">{formattedTimeLeft}</p>
      {/* if in start mode, show Stop in button, otherwise in stop mode so show Start */}
      <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
  );
};

export default TimeLeft;
