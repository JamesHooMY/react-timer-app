import React, { useState, useEffect } from 'react';
import './TimerApp.css'; // Import the CSS for styling

const TimerApp: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 0.01);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStartStop = () => {
    setTimerOn(!timerOn);
    if (!timerOn && time === 0) {
      setLaps([0]);
    }
  };

  const handleLapReset = () => {
    if (!timerOn) {
      setTime(0);
      setLaps([]);
    } else {
      setLaps([0, ...laps.map((lap, index) => index === 0 ? time : lap)]);
    }
  };

  const formatTime = (time: number) => {
    return time.toFixed(2);
  };

  const getMaxLap = () => {
    return Math.max(...laps.slice(1));
  };

  const getMinLap = () => {
    return Math.min(...laps.slice(1));
  };

   return (
    <div className="timer-app">
      <h1 className="timer-title">Seconds Timer</h1>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="button-group">
        <button className="timer-button" onClick={handleStartStop}>
          {timerOn ? 'STOP' : 'START'}
        </button>
        <button className="timer-button" onClick={handleLapReset}>
          {timerOn ? 'LAP' : 'RESET'}
        </button>
      </div>
      <table className="timer-table">
        <thead>
          <tr>
            <th>Lap #</th>
            <th>Lap Time</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap, index) => (
            <tr key={index} style={{ color: lap === getMaxLap() ? 'red' : lap === getMinLap() ? 'green' : 'black' }}>
              <td>Lap {laps.length - index}</td>
              <td>{formatTime(lap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimerApp;
