import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import useQuery from '../../utils/useQuery';

function SuccessMessage() {
  const title = useQuery().get('title');
  const message = useQuery().get('message');
  const redirectUrl = useQuery().get('redirect');
  const buttonText = useQuery().get('buttonText');

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="title">
          <span className="text">{title}</span>
        </div>
        <div className="message">{message}</div>
        <div className="button-container">
          <Link className="button" to={redirectUrl}>{buttonText}</Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
