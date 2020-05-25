import React, { useState } from 'react';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

function RecoverPin() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  async function handleRecover(event) {
    event.preventDefault();
    const parsed = queryString.stringify({
      email,
      t: 120000,
    });

    history.push(`/f_timer?${parsed}`);
  }

  return (
    <div className="recover-container">
      <div className="content">
        <div className="recover-form">
          <h1 className="main__title">Terceirão Bonja 2020</h1>
          <form onSubmit={handleRecover} autoComplete="off">

            <label className="input-label" htmlFor="email-input">
              <span className="label-title">E-mail</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: email@example.com"
                type="email"
                id="email-input"
                required
                autoComplete="off"
                autoCorrect="off"
              />
            </label>

            <button id="submit-button" className="button" type="submit">Reenviar e-mail</button>
          </form>

          <Link className="link" to="/login">
            <FiLogIn size={16} color="#2980b9" />
            <span className="link-text">Voltar para login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}


export default RecoverPin;
