import moment from "moment";
import React from "react";
import { useState } from "react";

// Break label component
const Break = () => {
  // create and initialise a breakLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is breakLength and second is setBreakLength variable
  // set default as 5mins (300(sec) = 5(min) x 60(sec))
  const [breakLength, setBreakLength] = useState(300);

  // function which decrements the breakLength by 1 min
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;

    // BreakLength should not be less than 0
    // if less than 0, set to 0
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
