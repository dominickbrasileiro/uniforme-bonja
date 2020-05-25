import React, { useState } from 'react';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('student');
  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();
    const parsed = queryString.stringify({
      name,
      email,
      type,
      t: 120000,
    });
    history.push(`/r_timer?${parsed}`);
  }

  return (
    <div className="register-container">
      <div className="content">

        <div className="register-form">
          <h1 className="main__title">Terceirão Bonja 2020</h1>
          <form onSubmit={handleRegister} autoComplete="off">
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

            <label className="input-label" htmlFor="type-input">
              <span className="label-title">Eu sou:</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type-input"
              >
                <option value="student">Aluno</option>
                <option value="teacher">Professor</option>
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
