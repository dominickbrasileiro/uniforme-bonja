import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import translateStatus from '../../utils/translateStatus';
import formatBRL from '../../utils/formatBRL';

import './styles.css';

import itemsNameAndPrice from '../../assets/items.json';

function Demand({ demand }) {
  const history = useHistory();
  const [status, setStatus] = useState(demand.status);

  useEffect(() => {
    translateStatus(status, setStatus);
  }, [status]);

  function handleClickPayment() {
    history.push(`/demands/checkout/${demand._id}?amount=${demand.price}`);
  }

  function handleClickCancel() {
    const parsed = queryString.stringify({
      demand: demand._id,
      price: demand.price,
    });
    history.push(`/demands/cancel?${parsed}`);
  }

  function handleClickDetails() {
    history.push(`/boletos/${demand._id}`);
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

  return (
    <div className="demand-container">
      <div className={`card ${demand.deleted ? 'deleted' : ''}`}>
        <span className="demand-title">
          Pedido
          {' '}
          #
          {demand._id}
        </span>

        <div className="demand-items">
          {renderItems()}
        </div>

        <div className="demand-price">
          <strong>Valor: </strong>
          {formatBRL(demand.price)}
        </div>

        {demand.status !== 'created' ? (
          <div className="demand-status">
            Situação:
            {' '}
            <span className={`status ${demand.status}`}>
              {status}
            </span>
          </div>
        ) : ''}

        {!demand.deleted && demand.payment_method === 'boleto' && demand.status !== 'paid' && demand.status !== 'refused' && demand.status !== 'created' ? (
          <button
            className="details-button"
            type="button"
            onClick={handleClickDetails}
          >
            Ver Detalhes
          </button>
        ) : ''}

        {!demand.deleted && demand.status === 'created' ? (
          <>
            <button
              className="payment-button"
              type="button"
              onClick={handleClickPayment}
            >
              Pagar
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={handleClickCancel}
            >
              Cancelar pedido
            </button>
          </>
        ) : ''}
      </div>
    </div>
  );
}

export default Demand;
