import React from "react";
import "./App.css";
import Break from "./components/Break.jsx";
import Session from "./components/Session";

function App() {
  return (
    <div className="App">
      <Break />
      <Session />
      {/* <button id="break-decrement">Break decrement</button>
      <button id="break-increment">Break increment</button>
      <innerText id="session-label">Session</innerText>
      <button id="session-decrement">Session decrement</button>
      <button id="session-increment">Session increment</button>
      <nodeName id="break-length">5</nodeName>
      <nodeName id="session-length">25</nodeName>
      <innerText id="timer-label">Session</innerText>
      <p id="time-left"></p>
      <button id="start_stop">Start</button>
      <button id="reset">Reset</button> */}
    </div>
  );
}

export default App;
