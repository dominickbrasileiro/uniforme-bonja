import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import useQuery from '../../utils/useQuery';

function ErrorMessage() {
  const title = useQuery().get('title');
  const message = useQuery().get('message');
  const fromUrl = useQuery().get('from');

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="title">
          <span className="text">{title}</span>
        </div>
        <div className="message">{message}</div>
        <div className="button-container">
          <Link className="button" to={fromUrl}>Voltar</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
