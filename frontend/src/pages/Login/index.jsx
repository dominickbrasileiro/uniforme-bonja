import React, { useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import useQuery from '../../utils/useQuery';

function Login() {
  const initialEnrollment = useQuery().get('enrollment') || '';
  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [accessPin, setAccessPin] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    const button = document.getElementById('submit-button');
    button.disabled = true;

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/sessions`, {
        enrollment,
        access_pin: accessPin,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      history.push('/');
    } catch (error) {
      let message = '';

      try {
        message = error.response.data.error;
      } catch (err) {
        message = 'Não foi possível autenticar a sua sessão. Verifique sua conexão e tente novamente.';
      }

      const parsed = queryString.stringify({
        title: 'Erro na autenticação',
        message,
        from: '/login',
      });

      history.push(`/error?${parsed}`);
    }
  }

  return (
    <div className="login-container">
      <div className="content">

        <div className="login-form">
          <h1 className="main__title">Terceirão Bonja 2020</h1>
          <form onSubmit={handleLogin}>
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

            <label className="input-label" htmlFor="pin-input">
              <span className="label-title">Chave de acesso</span>
              <input
                value={accessPin}
                onChange={(e) => setAccessPin(e.target.value)}
                placeholder="Ex: 647051"
                type="text"
                id="pin-input"
                required
                minLength={6}
                maxLength={6}
                pattern="\d*"
                autoComplete="off"
                autoCorrect="off"
              />
            </label>

            <Link className="recover-link" to="/forgot_pin">
              Esqueci a minha chave de acesso
            </Link>

            <button id="submit-button" className="button" type="submit">Entrar</button>
          </form>

          <Link className="link" to="/register">
            <FiLogIn size={16} color="#2980b9" />
            <span className="link-text">Não tenho cadastro</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
