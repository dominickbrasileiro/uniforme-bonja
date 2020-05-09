import React from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './styles.css';

function Counter({ value, setFunction }) {
  const MIN = 0;
  const MAX = 99;

  function decrease(num) {
    if (num <= MIN) return MIN;
    if (num > MAX) return MAX;
    return num - 1;
  }

  function increase(num) {
    if (num < MIN) return MIN;
    if (num >= MAX) return MAX;
    return num + 1;
  }

  return (
    <div className="counter">
      <button
        type="button"
        className="counter-button down"
        onClick={() => setFunction(decrease(value))}
      >
        <FaAngleLeft />
      </button>
      <input
        type="number"
        value={value}
        readOnly
        min={0}
      />
      <button
        type="button"
        className="counter-button up"
        onClick={() => setFunction(increase(value))}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}

export default Counter;
