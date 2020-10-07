import moment from "moment";
import React from "react";
import { useState } from "react";

// Session label component
const Session = () => {
  // create and initialise a sessionLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is sessionLength and second is setSessionLength variable
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

  // duration function from the js library 'moment' which converts a given time and
  // it's unit to the unit format you want. Hence, sessionLength variable is in seconds
  // we want to convert that to minutes and initialise it to another variable
  const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();

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
