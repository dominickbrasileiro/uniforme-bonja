import React from 'react';
import Countdown from 'react-countdown';
import { Circle } from 'rc-progress';

import './styles.css';

import formatTime from '../../utils/formatTime';

function CircleTimer({ value }) {
  return (
    <Countdown
      date={Date.now() + value}
      renderer={(props) => {
        const timeLeft = props.total;
        return (
          <div className="timer">
            <Circle percent={(timeLeft / value) * 100} strokeWidth="4" strokeColor="#2980b9" />
            <div className="timeleft">{formatTime(timeLeft)}</div>
          </div>
        );
      }}
    />
  );
}

export default CircleTimer;
