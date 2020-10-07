import moment from "moment";
import React from "react";

// Break label component
const Break = (props) => {
  // destructure the props passed in App.js
  const {
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
  } = props;

  // duration function from the js library 'moment' which converts a given time and
  // it's unit to the unit format you want. Hence, breakLength variable is in seconds
  // we want to convert that to minutes and initialise it to another variable
  const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();

  return (
    <div>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLengthInMinutes}</p>
      {/* decrease time by 60sec */}
      <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}>
        -
      </button>
      {/* increase time by 60sec */}
      <button id="break-increment" onClick={incrementBreakLengthByOneMinute}>
        +
      </button>
    </div>
  );
};

export default Break;
