import React, { useState, useRef } from "react";

const secondsToTime = (totalSeconds: number) => {
  const minutes = Math.trunc(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes} : ${seconds}`;
};

const App = () => {
  const defaultTimerSize = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(defaultTimerSize);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const startTimer = () => {
    if (timerRef.current !== null) return;
    setRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) {
          return timeLeft - 1;
        }
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current === null) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimeLeft(defaultTimerSize);
    setRunning(false);
  };

  return (
    <div className="app">
      <div className="timer">{secondsToTime(timeLeft)}</div>
      <div className="buttons">
        {!running && <button onClick={startTimer}>Start</button>}
        {running && <button onClick={pauseTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default App;
