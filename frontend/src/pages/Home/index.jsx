import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { MdCreate } from 'react-icons/md';
import NoDemandsText from '../../components/NoDemandsText';
import Demand from '../../components/Demand';
import Footer from '../../components/Footer';

import logo from '../../assets/imgs/logo.png';
import modelosPdf from '../../assets/TERCEIRÃO_BONJA.pdf';

import './styles.css';
import './responsiveStyles.css';

function Home() {
  const [demands, setDemands] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));


  function loadDemands() {
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/demands`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setDemands(res.data);
      })
      .catch();
  }

  useEffect(() => {
    loadDemands();
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const [firstName] = user.name.split(' ');

  function renderDemands() {
    const localDemands = [...demands];
    return localDemands.map((demand) => (
      <Demand
        key={demand._id}
        demand={demand}
        loadDemands={loadDemands}
      />
    ));
  }

  return (
    <div className="home-container">
      <div className="content">
        <header className="header" onClick={() => window.scroll(0, 0)}>
          <div className="logo">
            <img src={logo} alt="Logo Terceirão Bonja 2020" />
          </div>
          <span className="brand">Terceirão Bonja 2020</span>
        </header>

        <main className="main-content">
          <div className="welcome-group">
            <h2 className="welcome-text">
              Bem-vindo(a),
              {' '}
              {firstName}
            </h2>

            <a href="/login" onClick={() => { localStorage.clear(); }} className="exit">
              <FiLogOut />
              Sair
            </a>
          </div>

          <section className="options-section">
            <a className="button" href={modelosPdf} download>
              <span className="button-text">
                Baixar modelos
                <IoMdDownload />
              </span>
            </a>

            <Link className="button" to="/demands/new">
              <span className="button-text">
                Novo pedido
                <MdCreate />
              </span>
            </Link>
          </section>

          <section className="demands-section">
            <h3 className="demands-section-title">Meus pedidos</h3>
            <div className="demands">
              {demands.length <= 0 ? <NoDemandsText /> : ''}
              {renderDemands()}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
