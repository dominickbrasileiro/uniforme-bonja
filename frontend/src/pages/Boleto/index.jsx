import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { FaPrint } from 'react-icons/fa';

import './styles.css';

import useQuery from '../../utils/useQuery';

import translateStatus from '../../utils/translateStatus';
import formatBRL from '../../utils/formatBRL';
import formatDate from '../../utils/formatDate';

function Boleto() {
  const history = useHistory();
  const [boleto, setBoleto] = useState({});
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');
  const { demandId } = useParams();
  const generated = useQuery().get('g');

  useEffect(() => {
    async function fetchData() {
      try {
        const boletoResult = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/boletos/${demandId}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setBoleto(boletoResult.data);
      } catch (error) {
        history.push('/');
      }
    }
    fetchData();
  }, [demandId, history, token]);

  useEffect(() => {
    translateStatus(boleto.current_status, setStatus);
  }, [boleto]);

  return (
    <div className="boleto-container">
      <div className={`boleto-content ${generated ? 'generated' : ''}`}>
        <div className="title">
          <Link to="/">
            <MdArrowBack size={22} />
          </Link>
          <span className="text">Vizualizar Boleto</span>
        </div>

        <div className="message">
          {generated ? <p>Boleto gerado com sucesso!</p> : ''}

          <div className="boleto-info">
            <div className="item">
              <span className="key">Linha digitável:</span>
              <span className="value">
                {boleto.boleto_barcode}
              </span>
            </div>

            <div className="item">
              <span className="key">Data de vencimento:</span>
              <span className="value">
                {formatDate(boleto.boleto_expiration_date)}
              </span>
            </div>

            <div className="item">
              <span className="key">Valor:</span>
              <span className="value">{formatBRL(boleto.amount / 100)}</span>
            </div>

            <div className="item">
              <span className="key">Situação:</span>
              <span className={`value status ${boleto.current_status === 'paid' ? 'paid' : ''}`}>{status}</span>
            </div>
          </div>

        </div>

        <div className="button-container">
          <a
            href={boleto.boleto_url}
            target="_blank"
            rel="noopener noreferrer"
            className="button confirm"
          >
            Imprimir Boleto
            <FaPrint />
          </a>
        </div>

      </div>
    </div>
  );
}

export default Boleto;
