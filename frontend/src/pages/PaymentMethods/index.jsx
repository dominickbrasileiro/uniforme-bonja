import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import ReactLoading from 'react-loading';

import useQuery from '../../utils/useQuery';

import './styles.css';

function PaymentMethods() {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const name = useQuery().get('name');
  const email = useQuery().get('email');
  const cpf = useQuery().get('cpf');
  const phone = useQuery().get('phone');
  const country = useQuery().get('country');
  const state = useQuery().get('state');
  const city = useQuery().get('city');
  const neighborhood = useQuery().get('neighborhood');
  const street = useQuery().get('street');
  const street_number = useQuery().get('street_number');
  const complementary = useQuery().get('complementary');
  const zipcode = useQuery().get('zipcode');

  const [amount, setAmount] = useState(0);
  const { demandId } = useParams();


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
        const isCreated = demandResult.data.status === 'created';

        if (!isDeleted && isCreated) {
          setAmount(demandResult.data.price);
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/');
      }
    }
    fetchData();
  }, [demandId, history, token]);

  async function handleBoleto(e) {
    e.preventDefault();
    const button = document.getElementById('boleto-confirm-button');
    const select = document.getElementById('payment-methods-select');
    button.disabled = true;
    select.disabled = true;

    setLoading(true);

    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/demands/checkout/${demandId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          name,
          cpf,
          email,
          phone,
          payment_method: 'boleto',
          billing_address: {
            country,
            state,
            city,
            neighborhood,
            street,
            street_number,
            complementary,
            zipcode,
          },
        },
      });

      setTimeout(() => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/boletos/${demandId}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(() => history.push(`/boletos/${demandId}?g=1`))
          .catch(() => history.push('/'));
      }, 5000);
    } catch (error) {
      let message = '';

      try {
        message = error.response.data.error;
      } catch (err) {
        message = 'Não foi possível gerar o boleto. Verifique sua conexão e tente novamente.';
      }

      const parsed = queryString.stringify({
        title: 'Erro ao gerar boleto',
        message,
        from: '/',
      });

      history.push(`/error?${parsed}`);
    }
  }

  function handleCreditCardProceed() {
    const parsed = queryString.stringify({
      name,
      email,
      cpf,
      phone,
      country,
      state,
      city,
      neighborhood,
      street,
      street_number,
      complementary,
      zipcode,
    });

    history.push(`/checkout/credit_card/${demandId}?${parsed}`);
  }

  return (
    <div className="checkout-container">
      {amount ? (
        <div className="checkout-content">
          <div className="title">
            <Link to="/">
              <MdArrowBack size={22} />
            </Link>
            <span className="text">Escolher forma de pagamento</span>
          </div>

          <div className="message">
            <div className="payment-methods">
              <label className="input-label" htmlFor="group-input">
                <span className="label-title">Forma de pagamento</span>
                <select
                  value={paymentMethod}
                  id="payment-methods-select"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="" disabled>Selecione a forma de pagamento</option>
                  <option value="boleto">Boleto Bancário</option>
                  <option value="credit_card">Cartão de Crédito</option>
                </select>
              </label>

              {paymentMethod === 'boleto' ? (
                <button
                  type="submit"
                  className="button confirm"
                  id="boleto-confirm-button"
                  onClick={handleBoleto}
                >
                  <ReactLoading
                    className={`loading ${isLoading ? 'active' : ''}`}
                    type="cylon"
                    color="#fff"
                    height="18px"
                    width="18px"
                  />
                  Gerar Boleto
                </button>
              ) : ''}

              {paymentMethod === 'credit_card' ? (
                <button
                  type="submit"
                  className="button confirm"
                  onClick={handleCreditCardProceed}
                >
                  Continuar
                </button>
              ) : ''}

            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default PaymentMethods;
