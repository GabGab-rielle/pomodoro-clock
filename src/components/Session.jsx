import moment from "moment";
import React from "react";
import {
  BreakSessionContainer,
  BreakSessionLabel,
  BreakSessionTime,
  PlusMinusButton,
  PlusMinusTimeContainer,
} from "../ui/BreakSessionUi";

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
    <BreakSessionContainer>
      <BreakSessionLabel id="session-label">Session Length</BreakSessionLabel>
      <PlusMinusTimeContainer>
        {/* decrease time by 60sec */}
        <PlusMinusButton
          id="session-decrement"
          onClick={decrementSessionLengthByOneMinute}
        >
          -
        </PlusMinusButton>
        {/* Session length */}
        <BreakSessionTime id="session-length">
          {sessionLengthInMinutes}
        </BreakSessionTime>
        {/* increase time by 60sec */}
        <PlusMinusButton
          id="session-increment"
          onClick={incrementSessionLengthByOneMinute}
        >
          +
        </PlusMinusButton>
      </PlusMinusTimeContainer>
    </BreakSessionContainer>
  );
};

export default Session;
