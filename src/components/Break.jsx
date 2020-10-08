import moment from "moment";
import React from "react";
import {
  BreakSessionContainer,
  BreakSessionLabel,
  BreakSessionTime,
  PlusMinusButton,
  PlusMinusTimeContainer,
} from "../ui/BreakSessionUi";

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
  const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();

  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="break-label">Break Length</BreakSessionLabel>
      <PlusMinusTimeContainer>
        {/* decrease time by 60sec */}
        <PlusMinusButton
          id="break-decrement"
          onClick={decrementBreakLengthByOneMinute}
        >
          -
        </PlusMinusButton>
        {/* Break length */}
        <BreakSessionTime id="break-length">
          {breakLengthInMinutes}
        </BreakSessionTime>
        {/* increase time by 60sec */}
        <PlusMinusButton
          id="break-increment"
          onClick={incrementBreakLengthByOneMinute}
        >
          +
        </PlusMinusButton>
      </PlusMinusTimeContainer>
    </BreakSessionContainer>
  );
};

export default Break;
