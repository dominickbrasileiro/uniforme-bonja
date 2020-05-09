import React, { useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import Timer from '../../components/Timer';

import './styles.css';

import useQuery from '../../utils/useQuery';

function RegisterTimer() {
  const timerValue = parseInt(useQuery().get('t'));
  const name = useQuery().get('name');
  const enrollment = useQuery().get('enrollment');
  const group = useQuery().get('group');
  const history = useHistory();

  useEffect(() => {
    async function handleRegister() {
      try {
        await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/users`,
          timeout: 120000,
          data: {
            name,
            enrollment,
            group,
          },
        });

        const parsed = queryString.stringify({
          title: 'Cadastro realizado com sucesso!',
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
          message = 'Não foi possível concluir o cadastro. Verifique sua conexão e tente novamente.';
        }

        const parsed = queryString.stringify({
          title: 'Erro no cadastro',
          message,
          from: '/register',
        });

        history.push(`/error?${parsed}`);
      }
    }

    handleRegister();
  }, [enrollment, group, history, name]);

  return (
    <div className="timer-container">
      <div className="timer-content">
        <div className="title">Efetuando cadastro</div>
        <div className="message">
          <span className="text">Seu cadastro será efetuado em até 2 minutos</span>
          <Timer value={timerValue} />
        </div>
      </div>
    </div>
  );
}

export default RegisterTimer;
