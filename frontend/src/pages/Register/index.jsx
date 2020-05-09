import React, { useState } from 'react';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [group, setGroup] = useState('3A');
  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();
    const parsed = queryString.stringify({
      name,
      enrollment,
      group,
      t: 120000,
    });
    history.push(`/r_timer?${parsed}`);
  }

  return (
    <div className="register-container">
      <div className="content">

        <div className="register-form">
          <h1 className="main__title">Terceirão Bonja 2020</h1>
          <form onSubmit={handleRegister}>
            <label className="input-label" htmlFor="name-input">
              <span className="label-title">Nome completo</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Vanderlei Lopes"
                type="text"
                id="name-input"
                required
                pattern="[a-zA-Z\s]*"
                autoComplete="off"
              />
            </label>


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

            <label className="input-label" htmlFor="group-input">
              <span className="label-title">Turma</span>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                id="group-input"
              >
                <option value="3A">3A</option>
                <option value="3B">3B</option>
                <option value="3C">3C</option>
              </select>
            </label>

            <button id="submit-button" className="button" type="submit">Cadastrar</button>
          </form>

          <Link className="link" to="/login">
            <FiLogIn size={16} color="#2980b9" />
            <span className="link-text">Já tenho cadastro</span>
          </Link>
        </div>

      </div>
    </div>
  );
}


export default Register;
