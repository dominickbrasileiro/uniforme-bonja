import React from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import formatBRL from '../../utils/formatBRL';

import './styles.css';

import itemsNameAndPrice from '../../assets/items.json';

function Demand({ demand }) {
  const history = useHistory();

  function handleClickCancel() {
    const parsed = queryString.stringify({
      demand: demand._id,
      price: demand.price,
    });
    history.push(`/demands/cancel?${parsed}`);
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
          <strong>Preço: </strong>
          {formatBRL(demand.price)}
        </div>

        {!demand.deleted ? <button className="cancel-button" type="button" onClick={handleClickCancel}>Cancelar pedido</button> : ''}
      </div>
    </div>
  );
}

export default Demand;
