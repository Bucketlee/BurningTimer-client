import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import CountTimerView from "./CountTimerView.jsx";

class Timer {
  constructor({ ms, onTick }) {
    this.ms = ms ? ms : 0;
    this.onTick = onTick;
  }

  start = () => {
    if (this._isRunning) {
      return;
    }

    if (localStorage.getItem("_tick")) {
      cancelAnimationFrame(localStorage.getItem("_tick"));
    }

    this._isRunning = true;
    this._timestamp = new Date();

    this._tick = () => {
      const currentTime = new Date();
      const timeLag = currentTime - this._timestamp;

      if (timeLag >= 1000) {
        this.ms += currentTime - this._timestamp;
        this._timestamp = currentTime;
        this.onTick(this.ms);
      }

      this._interval = requestAnimationFrame(this._tick);
    }

    localStorage.setItem("_tick", this._tick);

    requestAnimationFrame(this._tick);
  }

  pause = () => {
    if (!this._isRunning) {
      return;
    }

    this._isRunning = false;
    localStorage.setItem("_tick", null);
    cancelAnimationFrame(this._interval);
    this._interval = undefined;
  }

  stop = () => {
    if (!this._isRunning && this.ms === 0) {
      return;
    }

    this._isRunning = false;
    localStorage.setItem("_tick", null);
    cancelAnimationFrame(this._interval);
    this._interval = undefined;
    this.ms = 0;
    this.onTick(this.ms);
  }
}

export default function CountTimer({ ms, onTimerStart, onTimerPause, onTimerStop }) {
  const [milliseconds, setMilliseconds] = useState(ms ? ms : 0); // setMilliseconds -> onTick으로 callback 담아줌
  const [isRunning, setIsRunning] = useState(false);

  const timer = useMemo(
    () => new Timer({ ms, onTick: setMilliseconds }),
    [ms],
  );

  return (
    <CountTimerView
      isRunning={isRunning}
      milliseconds={milliseconds}
      onStartButtonClick={() => {
        timer.start();
        setIsRunning(true);
        onTimerStart();
      }}
      onPauseButtonClick={() => {
        timer.pause();
        setIsRunning(false);
        onTimerPause();
      }}
      onStopButtonClick={() => {
        timer.stop();
        setIsRunning(false);
        onTimerStop()
      }}
    />
  )
}

CountTimer.propTypes = {
  ms: PropTypes.number,
  onTimerStart: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerStop: PropTypes.func,
};
