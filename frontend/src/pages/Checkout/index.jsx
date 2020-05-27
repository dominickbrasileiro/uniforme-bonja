import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import emailValidator from 'email-validator';
import { cpf } from 'cpf-cnpj-validator';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

import formatPhone from '../../utils/formatPhone';
import formatCpf from '../../utils/formatCpf';

const PHONE_REGEX = /^\+(?:[0-9]?){6,14}[0-9]$/;

function Checkout() {
  const history = useHistory();
  const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).name || '');
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user')).email || '');
  const [cpfValue, setCpf] = useState('');
  const [formatedCpf, setFormatedCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [formatedPhone, setFormatedPhone] = useState('');
  const [isValid, setValidation] = useState(false);
  const { demandId } = useParams();

  // Formated phone to raw phone number
  useEffect(() => {
    const number = formatedPhone.replace(/[()-\s]/g, '');

    setPhone(`+55${number}`);
  }, [formatedPhone]);

  // Formated CPF to raw CPF number
  useEffect(() => {
    const rawCpf = formatedCpf.replace(/[.-\s]/g, '');

    setCpf(rawCpf);
  }, [formatedCpf]);

  // button.disabled validation
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

  function handleProceed() {
    const parsed = queryString.stringify({
      name,
      email,
      cpf: cpfValue,
      phone,
    });

    history.push(`/checkout/payment_methods/${demandId}?${parsed}`);
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="title">
          <Link to="/">
            <MdArrowBack size={22} />
          </Link>
          <span className="text">Dados Cadastrais</span>
        </div>

        <div className="message">
          <form className="payment-form" autoComplete="off">
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
                required
                autoComplete="off"
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
                required
                autoComplete="off"
              />
            </label>

            <button
              type="submit"
              className="button confirm"
              onClick={handleProceed}
              disabled={!isValid}
            >
              Continuar para pagamento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
