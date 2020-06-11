/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pagarme from 'pagarme';
import queryString from 'query-string';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import ReactLoading from 'react-loading';
import { useCardBrand, images } from 'react-card-brand';

import useQuery from '../../utils/useQuery';

import './styles.css';

import formatExpiry from '../../utils/formatExpiry';
import formatBRL from '../../utils/formatBRL';
import formatName from '../../utils/formatName';

function Checkout() {
  const token = localStorage.getItem('token');
  const encryption_key = process.env.REACT_APP_PAGARME_ENCRYPTION_KEY;
  const history = useHistory();
  const [isValid, setValidation] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { demandId } = useParams();
  const [amount, setAmount] = useState(0);
  const cpf = useQuery().get('cpf');
  const email = useQuery().get('email');
  const name = useQuery().get('name');
  const phone = useQuery().get('phone');
  const country = useQuery().get('country');
  const state = useQuery().get('state');
  const city = useQuery().get('city');
  const neighborhood = useQuery().get('neighborhood');
  const street = useQuery().get('street');
  const street_number = useQuery().get('street_number');
  const complementary = useQuery().get('complementary');
  const zipcode = useQuery().get('zipcode');

  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [formatedExpiry, setFormatedExpiry] = useState('');
  const [holderName, setHolderName] = useState('');
  const [number, setNumber] = useState('');
  const [installments, setInstallments] = useState(1);
  const [maxInstallments, setMaxInstallments] = useState(1);

  const { getSvgProps } = useCardBrand();
  const [cardBrand, setCardBrand] = useState('');

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

          const minInstallmentAmount = 50;

          const _maxInstallments = Math.floor(demandResult.data.price / minInstallmentAmount);

          if (_maxInstallments >= 3) {
            setMaxInstallments(3);
          } else if (_maxInstallments <= 1) {
            setMaxInstallments(1);
          } else {
            setMaxInstallments(_maxInstallments);
          }
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/');
      }
    }
    fetchData();
  }, [demandId, history, token]);

  useEffect(() => {
    const date = formatedExpiry.replace(/[/]/g, '');

    setExpiry(date);
  }, [formatedExpiry]);

  useEffect(() => {
    const card = {
      card_holder_name: formatName(holderName),
      card_expiration_date: expiry,
      card_number: number,
      card_cvv: cvv,
    };

    const cardValidation = pagarme.validate({ card });

    setCardBrand(cardValidation.card.brand);

    const isHolderNameValid = cardValidation.card.card_holder_name;
    const isExpiryValid = cardValidation.card.card_expiration_date;
    const isNumberValid = cardValidation.card.card_number;
    const isCvvValid = cardValidation.card.card_cvv;

    if (
      isHolderNameValid
      && isExpiryValid
      && isNumberValid
      && isCvvValid
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [holderName, number, expiry, cvv]);

  async function handleConfirm(e) {
    e.preventDefault();
    const button = document.getElementById('creditcard-confirm-button');
    button.disabled = true;

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input) => {
      const target = input;
      target.disabled = true;
    });

    setLoading(true);

    const card = {
      card_holder_name: formatName(holderName),
      card_expiration_date: expiry,
      card_number: number,
      card_cvv: cvv,
    };

    try {
      const client = await pagarme.client.connect({ encryption_key });
      const card_hash = await client.security.encrypt(card);

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
          payment_method: 'credit_card',
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
          card_hash,
          installments,
        },
      });

      history.push('/');
    } catch (error) {
      let message = '';

      try {
        message = error.response.data.error;
      } catch (err) {
        message = 'Não foi possível concluir o pagamento. Verifique sua conexão e tente novamente.';
      }

      const parsed = queryString.stringify({
        title: 'Erro ao concluir pagamento',
        message,
        from: '/',
      });

      history.push(`/error?${parsed}`);
    }
  }

  return (
    <div className="checkout-creditcard-container">
      {amount ? (
        <div className="checkout-creditcard-content">
          <div className="title">
            <Link to="/">
              <MdArrowBack size={22} />
            </Link>
            <span className="text">Cartão de Crédito</span>
          </div>

          <div className="message">
            <form className="creditcard-form" onSubmit={handleConfirm}>
              <label className="input-label" htmlFor="name-input">
                <span className="label-title">Nome do Titular</span>
                <input
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Ex: VANDERLEI LOPES"
                  type="text"
                  id="name-input"
                  required
                  autoComplete="off"
                />
              </label>

              <label className="input-label" htmlFor="number-input">
                <span className="label-title">Número do Cartão</span>
                <div className="number-group">
                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="XXXXXXXXXXXXXXXX"
                    minLength={7}
                    maxLength={19}
                    type="text"
                    id="number-input"
                    required
                    autoComplete="off"
                  />
                  <svg {...getSvgProps({ type: cardBrand, images })} />
                </div>
              </label>

              <label className="input-label" htmlFor="group-input">
                <span className="label-title">Parcelas</span>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                >
                  {(function renderInstallments() {
                    const options = [];

                    for (let i = 1; i <= maxInstallments; i += 1) {
                      options.push((
                        <option value={i} key={i}>
                          {i}
                          x de
                          {' '}
                          {formatBRL(amount / i)}
                        </option>
                      ));
                    }

                    return options;
                  }())}
                </select>
              </label>

              <label className="input-label" htmlFor="expiry-input">
                <span className="label-title">Validade</span>
                <input
                  value={formatedExpiry}
                  onChange={(e) => setFormatedExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  type="text"
                  id="expiry-input"
                  required
                  autoComplete="off"
                />
              </label>

              <label className="input-label" htmlFor="cvv-input">
                <span className="label-title">CVV</span>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Ex: 398"
                  pattern="\d*"
                  minLength={3}
                  maxLength={3}
                  type="text"
                  id="cvv-input"
                  required
                  autoComplete="off"
                />
              </label>

              <button
                type="submit"
                className="button confirm"
                id="creditcard-confirm-button"
                disabled={!isValid}
              >
                <ReactLoading
                  className={`loading ${isLoading ? 'active' : ''}`}
                  type="cylon"
                  color="#fff"
                  height="18px"
                  width="18px"
                />
                Finalizar Pagamento
              </button>

            </form>

          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default Checkout;
