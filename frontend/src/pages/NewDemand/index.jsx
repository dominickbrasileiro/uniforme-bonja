import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';

import ConfirmNewDemand from '../../components/ConfirmNewDemand';
import Counter from '../../components/Counter';
import Footer from '../../components/Footer';

import formatFirstName from '../../utils/formatFirstName';
import formatBRL from '../../utils/formatBRL';
import isObjectNotEmpty from '../../utils/isObjectNotEmpty';

import logo from '../../assets/imgs/logo.png';

import moletom from '../../assets/imgs/moletom.png';
import camisa1 from '../../assets/imgs/camisa1.png';
import camisa2 from '../../assets/imgs/camisa2.png';
import corta1 from '../../assets/imgs/corta1.png';
import corta2 from '../../assets/imgs/corta2.png';
import calca from '../../assets/imgs/calca.png';

import './styles.css';
import './responsiveStyles.css';

import items from '../../assets/items.json';

function Home() {
  const [moletomAmount, setMoletomAmount] = useState(0);
  const [moletomSize, setMoletomSize] = useState('M');

  const [camisa1Amount, setCamisa1Amount] = useState(0);
  const [camisa1Size, setCamisa1Size] = useState('M BABY LOOK');

  const [camisa2Amount, setCamisa2Amount] = useState(0);
  const [camisa2Size, setCamisa2Size] = useState('M BABY LOOK');

  const [corta1Amount, setCorta1Amount] = useState(0);
  const [corta1Size, setCorta1Size] = useState('M');

  const [corta2Amount, setCorta2Amount] = useState(0);
  const [corta2Size, setCorta2Size] = useState('M');

  const [calcaAmount, setCalcaAmount] = useState(0);
  const [calcaSize, setCalcaSize] = useState('M - Feminina');

  const [total, setTotal] = useState(0);

  const [finalDemand, setFinalDemand] = useState({});

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const sessionExpiritation = localStorage.getItem('sessionExpiration');

  useEffect(() => {
    if (sessionExpiritation && sessionExpiritation > Date.now()) {
      const confirmButton = document.querySelector('.button[type="submit"]');
      if (moletomAmount
        || camisa1Amount
        || camisa2Amount
        || corta1Amount
        || corta2Amount
        || calcaAmount) {
        confirmButton.disabled = false;
      } else {
        confirmButton.disabled = true;
      }

      const prices = [
        moletomAmount * items.moletom.price,
        camisa1Amount * items.camisa1.price,
        camisa2Amount * items.camisa2.price,
        corta1Amount * items.corta1.price,
        corta2Amount * items.corta2.price,
        calcaAmount * items.calca.price,
      ];

      const totalPrice = prices.reduce((accumulator, price) => accumulator + price, 0);
      setTotal(totalPrice);
    } else {
      localStorage.clear();
      history.push('/login');
    }
  }, [
    sessionExpiritation,
    moletomAmount,
    camisa1Amount,
    camisa2Amount,
    corta1Amount,
    corta2Amount,
    calcaAmount,
    history,
  ]);

  if (!sessionExpiritation || Date.now() > sessionExpiritation) {
    localStorage.clear();
    return <Redirect to="/login" />;
  }

  const [firstName] = user.name.split(' ');

  async function handleSubmit(event) {
    event.preventDefault();
    const button = event.target;
    button.disabled = true;

    const data = {
      moletom: { amount: moletomAmount, size: moletomSize },
      camisa1: { amount: camisa1Amount, size: camisa1Size },
      camisa2: { amount: camisa2Amount, size: camisa2Size },
      corta1: { amount: corta1Amount, size: corta1Size },
      corta2: { amount: corta2Amount, size: corta2Size },
      calca: { amount: calcaAmount, size: calcaSize },
    };

    const objects = Object.entries(data);

    const demandItems = Object.fromEntries(objects.filter(([, { amount }]) => amount > 0));

    setFinalDemand({
      items: demandItems,
      price: total,
    });
  }

  return (
    <div className="div">
      {
        isObjectNotEmpty(finalDemand)
          ? <ConfirmNewDemand demand={finalDemand} setFunc={setFinalDemand} />
          : (
            <div className="newdemand-container">
              <div className="content">
                <header className="header" onClick={() => history.push('/')}>
                  <div className="logo">
                    <img src={logo} alt="Logo Terceirão Bonja 2020" />
                  </div>
                  <span className="brand">Terceirão Bonja 2020</span>
                </header>

                <main className="main-content">
                  <div className="welcome-group">
                    <h2 className="welcome-text">
                      <Link to="/">
                        <MdArrowBack size={24} color="#000" />
                      </Link>
                      Bem-vindo(a),
                      {' '}
                      {formatFirstName(firstName)}
                    </h2>

                    <Link to="/login" onClick={() => { localStorage.clear(); }} className="exit">
                      <FiLogOut />
                      Sair
                    </Link>
                  </div>

                  <section className="newdemand-section">
                    <h3 className="newdemand-section-title">Novo pedido</h3>
                    <form className="newdemand-form" onSubmit={handleSubmit}>

                      <div className={`option ${moletomAmount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={moletom} alt="Moletom Terceirão Bonja 2020" />
                          </div>
                          <span className="name">{items.moletom.name}</span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select
                            value={moletomSize}
                            onChange={(e) => setMoletomSize(e.target.value)}
                          >
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.moletom.price)}</strong>
                        </span>
                        <Counter value={moletomAmount} setFunction={setMoletomAmount} />
                      </div>

                      <div className={`option ${camisa1Amount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={camisa1} alt="Camiseta Terceirão Bonja 2020" />
                          </div>
                          <span className="name">
                            {items.camisa1.name}
                            <br />
                            <br />
                            <span className="camiseta-oficial">
                              *CAMISETA OFICIAL*
                            </span>
                          </span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select
                            value={camisa1Size}
                            onChange={(e) => setCamisa1Size(e.target.value)}
                          >
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                            <option value="ESP">ESP</option>
                            <option value="PP BABY LOOK">PP BABY LOOK</option>
                            <option value="P BABY LOOK">P BABY LOOK</option>
                            <option value="M BABY LOOK">M BABY LOOK</option>
                            <option value="G BABY LOOK">G BABY LOOK</option>
                            <option value="GG BABY LOOK">GG BABY LOOK</option>
                            <option value="XG BABY LOOK">XG BABY LOOK</option>
                            <option value="ESP BABY LOOK">ESP BABY LOOK</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.camisa1.price)}</strong>
                        </span>
                        <Counter value={camisa1Amount} setFunction={setCamisa1Amount} />
                      </div>

                      <div className={`option ${camisa2Amount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={camisa2} alt="Camiseta Terceirão Bonja 2020" />
                          </div>
                          <span className="name">{items.camisa2.name}</span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select
                            value={camisa2Size}
                            onChange={(e) => setCamisa2Size(e.target.value)}
                          >
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                            <option value="ESP">ESP</option>
                            <option value="PP BABY LOOK">PP BABY LOOK</option>
                            <option value="P BABY LOOK">P BABY LOOK</option>
                            <option value="M BABY LOOK">M BABY LOOK</option>
                            <option value="G BABY LOOK">G BABY LOOK</option>
                            <option value="GG BABY LOOK">GG BABY LOOK</option>
                            <option value="XG BABY LOOK">XG BABY LOOK</option>
                            <option value="ESP BABY LOOK">ESP BABY LOOK</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.camisa2.price)}</strong>
                        </span>
                        <Counter value={camisa2Amount} setFunction={setCamisa2Amount} />
                      </div>

                      <div className={`option ${corta1Amount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={corta1} alt="Corta vento Terceirão Bonja 2020" />
                          </div>
                          <span className="name">{items.corta1.name}</span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select value={corta1Size} onChange={(e) => setCorta1Size(e.target.value)}>
                            <option value="14">14</option>
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.corta1.price)}</strong>
                        </span>
                        <Counter value={corta1Amount} setFunction={setCorta1Amount} />
                      </div>

                      <div className={`option ${corta2Amount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={corta2} alt="Corta vento Terceirão Bonja 2020" />
                          </div>
                          <span className="name">{items.corta2.name}</span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select value={corta2Size} onChange={(e) => setCorta2Size(e.target.value)}>
                            <option value="14">14</option>
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.corta2.price)}</strong>
                        </span>
                        <Counter value={corta2Amount} setFunction={setCorta2Amount} />
                      </div>

                      <div className={`option ${calcaAmount > 0 ? 'selected' : ''}`}>
                        <div className="flex">
                          <div className="thumb">
                            <img src={calca} alt="Calça Terceirão Bonja 2020" />
                          </div>
                          <span className="name">{items.calca.name}</span>
                        </div>
                        <div className="sizes">
                          <span>Tamanho:</span>
                          <select value={calcaSize} onChange={(e) => setCalcaSize(e.target.value)}>
                            <option value="PP - Feminina">PP - Feminina</option>
                            <option value="P - Feminina">P - Feminina</option>
                            <option value="M - Feminina">M - Feminina</option>
                            <option value="G - Feminina">G - Feminina</option>
                            <option value="GG - Feminina">GG - Feminina</option>
                            <option value="P - Masculina">P - Masculina</option>
                            <option value="M - Masculina">M - Masculina</option>
                            <option value="G - Masculina">G - Masculina</option>
                            <option value="GG - Masculina">GG - Masculina</option>
                          </select>
                        </div>
                        <span className="price">
                          Preço:
                          {' '}
                          <strong className="value">{formatBRL(items.calca.price)}</strong>
                        </span>
                        <Counter value={calcaAmount} setFunction={setCalcaAmount} />
                      </div>

                      <div className="total">
                        <span className="text">Total:</span>
                        {' '}
                        <strong>
                          <span className="value">{formatBRL(total)}</span>
                        </strong>
                      </div>

                      <button className="button" type="submit">
                        Confirmar
                      </button>

                    </form>
                  </section>
                </main>
                <Footer />
              </div>
            </div>
          )
      }
    </div>
  );
}

export default Home;
