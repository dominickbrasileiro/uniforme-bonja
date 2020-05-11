import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import formatBRL from '../../utils/formatBRL';

import './styles.css';

import itemsNameAndPrice from '../../assets/items.json';

function ConfirmNewDemand({ demand, setFunc }) {
  const history = useHistory();
  const token = localStorage.getItem('token');

  async function handleConfirm(event) {
    const button = event.target;
    button.disabled = true;
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/demands`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: demand.items,
      });

      const parsed = queryString.stringify({
        title: 'Pedido cadastrado com sucesso!',
        message: `Seu pedido no valor de ${formatBRL(demand.price)} foi cadastrado com sucesso.`,
        redirect: '/',
        buttonText: 'Ver Pedidos',
      });

      history.push(`/success?${parsed}`);
    } catch (error) {
      let message = '';

      try {
        message = error.response.data.error;
      } catch (err) {
        message = 'Não foi possível cadastrar o seu pedido. Verifique sua conexão e tente novamente.';
      }

      const parsed = queryString.stringify({
        title: 'Erro ao cadastrar pedido',
        message,
        from: '/demands/new',
      });

      history.push(`/error?${parsed}`);
    }
  }


  function renderItems() {
    const items = Object.entries(demand.items);

    return items.map((item, index) => {
      const [name, options] = item;
      return (
        <span key={index} className="item">
          <strong>
            {options.amount}
            x
            {' '}
            {options.size}
          </strong>
          {' '}
          <em>
            {itemsNameAndPrice[name].name}
          </em>
        </span>
      );
    });
  }

  function handleReturn() {
    setFunc({});
  }

  return (
    <div className="confirm-newdemand-container">
      <div className="confirm-newdemand-content">
        <div className="title">
          <Link to="/demands/new">
            <MdArrowBack size={22} onClick={handleReturn} />
          </Link>
          <span className="text">Confirmar pedido</span>
        </div>

        <div className="message">
          <div className="items">
            {renderItems()}
          </div>

          <div className="price">
            <strong>Preço: </strong>
            {formatBRL(demand.price)}
          </div>
        </div>

        <div className="button-container">
          <button type="button" className="button confirm" onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmNewDemand;
