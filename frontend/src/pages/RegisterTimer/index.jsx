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
  const email = useQuery().get('email');
  const type = useQuery().get('type');
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
            email,
            type,
          },
        });

        const parsed = queryString.stringify({
          title: 'Cadastro realizado com sucesso!',
          message: `Chave de acesso enviada para ${email}`,
          redirect: `/login?email=${email}`,
          buttonText: 'Faça Login',
        });

        history.push(`/success?${parsed}`);
      } catch (error) {
        console.log(error.response);
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
  }, [email, type, history, name]);

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
