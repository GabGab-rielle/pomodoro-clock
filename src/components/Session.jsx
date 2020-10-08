import moment from "moment";
import React from "react";

// Session label component
const Session = (props) => {
  // destructure the props passed in App.js
  const {
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
  } = props;

  // duration function from the js library 'moment' which converts a given time and
  // it's unit to the unit format you want. Hence, sessionLength variable is in seconds
  // we want to convert that to minutes and initialise it to another variable
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();

  return (
    <div>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLengthInMinutes}</p>
      {/* decrease time by 60sec */}
      <button
        id="session-decrement"
        onClick={decrementSessionLengthByOneMinute}
      >
        -
      </button>
      {/* increase time by 60sec */}
      <button
        id="session-increment"
        onClick={incrementSessionLengthByOneMinute}
      >
        +
      </button>
    </div>
  );
};

export default Session;
