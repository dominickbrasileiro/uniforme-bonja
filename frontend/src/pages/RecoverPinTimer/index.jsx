import React, { useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import Timer from '../../components/Timer';

import './styles.css';

import useQuery from '../../utils/useQuery';

function RecoverPinTimer() {
  const timerValue = parseInt(useQuery().get('t'));
  const enrollment = useQuery().get('enrollment');
  const history = useHistory();

  useEffect(() => {
    async function handleRegister() {
      try {
        await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/recover_pin/${enrollment}`,
          timeout: 120000,
        });

        const parsed = queryString.stringify({
          title: 'E-mail enviado com sucesso!',
          message: `Chave de acesso enviada para ${enrollment}@ielusc.br`,
          redirect: `/login?enrollment=${enrollment}`,
          buttonText: 'Faça Login',
        });

        history.push(`/success?${parsed}`);
      } catch (error) {
        let message = '';

        try {
          message = error.response.data.error;
        } catch (err) {
          message = 'Não foi possível recuperar a chave de acesso. Verifique sua conexão e tente novamente.';
        }

        const parsed = queryString.stringify({
          title: 'Erro na recuperação',
          message,
          from: '/forgot_pin',
        });

        history.push(`/error?${parsed}`);
      }
    }

    handleRegister();
  }, [enrollment, history]);

  return (
    <div className="timer-container">
      <div className="timer-content">
        <div className="title">Recuperando chave de acesso</div>
        <div className="message">
          <span className="text">Este processo pode levar até 2 minutos</span>
          <Timer value={timerValue} />
        </div>
      </div>
    </div>
  );
}

export default RecoverPinTimer;
