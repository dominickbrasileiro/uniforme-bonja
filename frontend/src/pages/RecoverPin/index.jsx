import React, { useState } from 'react';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

function RecoverPin() {
  const [enrollment, setEnrollment] = useState('');
  const history = useHistory();

  async function handleRecover(event) {
    event.preventDefault();
    const parsed = queryString.stringify({
      enrollment,
      t: 120000,
    });

    history.push(`/f_timer?${parsed}`);
  }

  return (
    <div className="recover-container">
      <div className="content">
        <div className="recover-form">
          <h1 className="main__title">Terceirão Bonja 2020</h1>
          <form onSubmit={handleRecover}>

            <label className="input-label" htmlFor="enrollment-input">
              <span className="label-title">Matrícula</span>
              <input
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                placeholder="Ex: 20180361"
                type="text"
                id="enrollment-input"
                required
                minLength={8}
                maxLength={8}
                pattern="(^20[0, 1][0-9]+)|(^2020[0-9]+)"
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
