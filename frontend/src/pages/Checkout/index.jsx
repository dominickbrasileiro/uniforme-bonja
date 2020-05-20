import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import emailValidator from 'email-validator';
import { cpf } from 'cpf-cnpj-validator';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import ReactLoading from 'react-loading';

import './styles.css';

import formatPhone from '../../utils/formatPhone';
import formatCpf from '../../utils/formatCpf';

const PHONE_REGEX = /^\+(?:[0-9]?){6,14}[0-9]$/;

function Checkout() {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).name || '');
  const [email, setEmail] = useState('');
  const [cpfValue, setCpf] = useState('');
  const [formatedCpf, setFormatedCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [formatedPhone, setFormatedPhone] = useState('');
  const [isValid, setValidation] = useState(false);
  const [isLoading, setLoading] = useState(false);
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

        if (!isDeleted) {
          setAmount(demandResult.data.price);
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/');
      }
    }
    fetchData();
  }, [demandId]);

  useEffect(() => {
    const number = formatedPhone.replace(/[()-\s]/g, '');

    setPhone(`+55${number}`);
  }, [formatedPhone]);

  useEffect(() => {
    const rawCpf = formatedCpf.replace(/[.-\s]/g, '');

    setCpf(rawCpf);
  }, [formatedCpf]);

  useEffect(() => {
    if (
      name.length > 2
      && emailValidator.validate(email)
      && cpf.isValid(cpfValue)
      && (phone.length === 14 || phone.length === 13)
      && PHONE_REGEX.test(phone)
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [name, email, cpfValue, phone]);

  async function handleBoleto(e) {
    e.preventDefault();
    const button = document.getElementById('boleto-confirm-button');
    button.disabled = true;

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input) => {
      const target = input;
      target.disabled = true;
    });

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
          cpf: cpfValue,
          email,
          phone,
          payment_method: 'boleto',
        },
      });

      setTimeout(() => {
        history.push(`/boletos/${demandId}?g=1`);
      }, 2500);
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
      cpf: cpfValue,
      phone,
      amount,
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
            <span className="text">Pagamento</span>
          </div>

          <div className="message">
            <div className="payment-methods">
              <label className="input-label" htmlFor="group-input">
                <span className="label-title">Forma de pagamento</span>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="" disabled>Selecione a forma de pagamento</option>
                  <option value="boleto">Boleto Bancário</option>
                  <option value="credit_card">Cartão de Crédito</option>
                </select>
              </label>

              {paymentMethod === 'boleto' ? (
                <>
                  <form className="payment-form" onSubmit={handleBoleto}>
                    <label className="input-label" htmlFor="name-input">
                      <span className="label-title">Nome completo</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Vanderlei Lopes"
                        type="text"
                        id="name-input"
                        required
                        pattern="[a-zA-Z\s]*"
                        autoComplete="off"
                      />
                    </label>

                    <label className="input-label" htmlFor="email-input">
                      <span className="label-title">E-mail</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: vanderlei.lopes@gmail.com"
                        type="text"
                        id="email-input"
                        required
                        autoComplete="off"
                      />
                    </label>

                    <label className="input-label" htmlFor="cpf-input">
                      <span className="label-title">CPF</span>
                      <input
                        value={formatedCpf}
                        onChange={(e) => setFormatedCpf(formatCpf(e.target.value))}
                        placeholder="Ex: 349.101.930-30"
                        type="text"
                        id="cpf-input"
                      />
                    </label>

                    <label className="input-label" htmlFor="phone-input">
                      <span className="label-title">Telefone</span>
                      <input
                        value={formatedPhone}
                        onChange={(e) => setFormatedPhone(formatPhone(e.target.value))}
                        placeholder="Ex: (47) 99787-3675"
                        type="text"
                        id="phone-input"
                      />
                    </label>

                    <button
                      type="submit"
                      className="button confirm"
                      id="boleto-confirm-button"
                      onClick={handleBoleto}
                      disabled={!isValid}
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

                  </form>
                </>
              ) : ''}

              {paymentMethod === 'credit_card' ? (
                <>
                  <form className="payment-form">
                    <label className="input-label" htmlFor="name-input">
                      <span className="label-title">Nome completo</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Vanderlei Lopes"
                        type="text"
                        id="name-input"
                        required
                        pattern="[a-zA-Z\s]*"
                        autoComplete="off"
                      />
                    </label>

                    <label className="input-label" htmlFor="email-input">
                      <span className="label-title">E-mail</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: vanderlei.lopes@gmail.com"
                        type="text"
                        id="email-input"
                        required
                        autoComplete="off"
                      />
                    </label>

                    <label className="input-label" htmlFor="cpf-input">
                      <span className="label-title">CPF</span>
                      <input
                        value={formatedCpf}
                        onChange={(e) => setFormatedCpf(formatCpf(e.target.value))}
                        placeholder="Ex: 349.101.930-30"
                        type="text"
                        id="cpf-input"
                      />
                    </label>

                    <label className="input-label" htmlFor="phone-input">
                      <span className="label-title">Telefone</span>
                      <input
                        value={formatedPhone}
                        onChange={(e) => setFormatedPhone(formatPhone(e.target.value))}
                        placeholder="Ex: (47) 99787-3675"
                        type="text"
                        id="phone-input"
                      />
                    </label>

                    <button
                      type="submit"
                      className="button confirm"
                      onClick={handleCreditCardProceed}
                      disabled={!isValid}
                    >
                      Continuar para pagamento
                    </button>

                  </form>
                </>
              ) : ''}

            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default Checkout;
