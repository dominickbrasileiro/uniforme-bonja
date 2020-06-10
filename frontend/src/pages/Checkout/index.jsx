import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import emailValidator from 'email-validator';
import { cpf } from 'cpf-cnpj-validator';
import { useHistory, useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

import formatPhone from '../../utils/formatPhone';
import formatCpf from '../../utils/formatCpf';
import formatZipcode from '../../utils/formatZipcode';

import brazil from '../../assets/brazil.json';

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
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('br');
  const [state, setState] = useState('sc');
  const [city, setCity] = useState('Joinville');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [street_number, setStreetNumber] = useState('');
  const [complementary, setComplementary] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [formatedZipcode, setFormatedZipcode] = useState('');

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

  useEffect(() => {
    const rawZipcode = formatedZipcode.replace(/[.-\s]/g, '');

    setZipcode(rawZipcode);
  }, [formatedZipcode]);

  // button.disabled validation
  useEffect(() => {
    const page1 = name.length > 2
      && emailValidator.validate(email)
      && cpf.isValid(cpfValue)
      && (phone.length === 14 || phone.length === 13)
      && PHONE_REGEX.test(phone);

    const page2 = country.length === 2
      && state
      && city
      && zipcode.length === 8;

    const page3 = street
      && !isNaN(street_number)
      && complementary
      && neighborhood;

    if (
      (page === 1 && page1)
      || (page === 2 && page2)
      || (page === 3 && page3)
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [name,
    email,
    cpfValue,
    phone,
    country,
    state,
    city,
    neighborhood,
    street,
    street_number,
    page,
    complementary,
    zipcode.length,
  ]);

  function handleProceed() {
    if (page === 3) {
      const parsed = queryString.stringify({
        name,
        email,
        cpf: cpfValue,
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

      return history.push(`/checkout/payment_methods/${demandId}?${parsed}`);
    }

    return setPage(page + 1);
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {page === 1 ? (
          <>
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
                  Continuar
                </button>
              </form>
            </div>
          </>
        ) : ''}

        {page === 2 ? (
          <>
            <div className="title">
              <Link to="/">
                <MdArrowBack size={22} />
              </Link>
              <span className="text">Endereço de Cobrança</span>
            </div>

            <div className="message">
              <form className="payment-form" autoComplete="off">
                <label className="input-label" htmlFor="country-select">
                  <span className="label-title">País</span>
                  <select
                    value={country}
                    id="country-select"
                    onChange={(e) => setCountry(e.target.value)}
                    disabled
                  >
                    <option value="br">Brasil</option>
                  </select>
                </label>

                <label className="input-label" htmlFor="state-select">
                  <span className="label-title">Estado</span>
                  <select
                    value={state}
                    id="state-select"
                    onChange={(e) => setState(e.target.value)}
                  >
                    {(function renderStates() {
                      return brazil.states.map((s) => (
                        <option
                          value={s.initials}
                          key={s.initials}
                        >
                          {s.name}
                        </option>
                      ));
                    }())}
                  </select>
                </label>

                <label className="input-label" htmlFor="city-select">
                  <span className="label-title">Cidade</span>
                  <select
                    value={city}
                    id="city-select"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {(function renderStates() {
                      if (state) {
                        const { cities } = brazil.states.find((s) => s.initials === state);

                        return cities.map((c) => (
                          <option
                            value={c}
                            key={c}
                          >
                            {c}
                          </option>
                        ));
                      }

                      return '';
                    }())}
                  </select>
                </label>

                <label className="input-label" htmlFor="cep-input">
                  <span className="label-title">CEP</span>
                  <input
                    value={formatedZipcode}
                    onChange={(e) => setFormatedZipcode(formatZipcode(e.target.value))}
                    placeholder="Ex: 89221-665"
                    type="text"
                    id="cep-input"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="button confirm"
                  onClick={handleProceed}
                  disabled={!isValid}
                >
                  Continuar
                </button>
              </form>
            </div>
          </>
        ) : ''}

        {page === 3 ? (
          <>
            <div className="title">
              <Link to="/">
                <MdArrowBack size={22} />
              </Link>
              <span className="text">Endereço de Cobrança</span>
            </div>

            <div className="message">
              <form className="payment-form" autoComplete="off">

                <label className="input-label" htmlFor="street-input">
                  <span className="label-title">Rua</span>
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Ex: R. Princesa Izabel"
                    type="text"
                    id="street-input"
                    required
                    autoComplete="off"
                  />
                </label>

                <label className="input-label" htmlFor="street-number-input">
                  <span className="label-title">Número</span>
                  <input
                    value={street_number}
                    onChange={(e) => setStreetNumber(e.target.value)}
                    placeholder="Ex: 438"
                    type="text"
                    id="street-number-input"
                    required
                    autoComplete="off"
                  />
                </label>

                <label className="input-label" htmlFor="complementary-input">
                  <span className="label-title">Complemento</span>
                  <input
                    value={complementary}
                    onChange={(e) => setComplementary(e.target.value)}
                    placeholder="Ex: apt. 401"
                    type="text"
                    id="complementary-input"
                    required
                    autoComplete="off"
                  />
                </label>

                <label className="input-label" htmlFor="neighborhood-input">
                  <span className="label-title">Bairro</span>
                  <input
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Centro"
                    type="text"
                    id="neighborhood-input"
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
                  Continuar
                </button>
              </form>
            </div>
          </>
        ) : ''}

      </div>
    </div>
  );
}

export default Checkout;
