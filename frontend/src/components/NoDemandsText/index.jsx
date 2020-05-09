import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function NoDemandsText() {
  return (
    <div className="nodemands-text">
      Nenhum pedido encontrado.
      {' '}
      <Link to="/demands/new">Cadastre um novo pedido.</Link>
    </div>
  );
}

export default NoDemandsText;
