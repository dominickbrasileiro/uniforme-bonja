import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import formatBRL from '../../utils/formatBRL';

import './styles.css';

function ConfirmDemandCancel() {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const { demandId } = useParams();
  const [demand, setDemand] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const demandResult = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/demands/${demandId}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const isDeleted = demandResult.data.deleted;

        if (!isDeleted) {
          setDemand(demandResult.data);
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/');
      }
    }
    fetchData();
  }, []);

  async function handleCancel(event) {
    const button = event.target;
    button.disabled = true;

    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/demands/${demandId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const parsed = queryString.stringify({
        title: 'Pedido cancelado com sucesso!',
        message: `Seu pedido no valor de ${formatBRL(demand.price)} foi cancelado com sucesso.`,
        redirect: '/',
        buttonText: 'Ver Pedidos',
      });
      history.push(`/success?${parsed}`);
    } catch (error) {
      let message = '';

      try {
        message = error.response.data.error;
      } catch (err) {
        message = 'Não foi possível cancelar o seu pedido. Verifique sua conexão e tente novamente.';
      }

      const parsed = queryString.stringify({
        title: 'Erro ao cancelar pedido',
        message,
        from: '/',
      });

      history.push(`/error?${parsed}`);
    }
  }

  return (
    <div className="confirm-cancel-container">
      {demand.price ? (
        <div className="confirm-cancel-content">
          <div className="title">
            <Link to="/">
              <MdArrowBack size={22} />
            </Link>
            <span className="text">Confirmar cancelamento</span>
          </div>
          <div className="message">
            Deseja cancelar o pedido #
            <strong>{demandId}</strong>
            {' '}
            no valor de
            {' '}
            <strong>{formatBRL(demand.price)}</strong>
            ?
          </div>
          <div className="button-container">
            <button type="button" className="button success" onClick={handleCancel}>Confirmar</button>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default ConfirmDemandCancel;
