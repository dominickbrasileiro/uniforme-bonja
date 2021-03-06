import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { MdDescription, MdPictureAsPdf, MdCreate } from 'react-icons/md';

import NoDemandsText from '../../components/NoDemandsText';
import Demand from '../../components/Demand';
import Footer from '../../components/Footer';

import formatFirstName from '../../utils/formatFirstName';

import logo from '../../assets/imgs/logo.png';
import modelosPdf from '../../assets/TERCEIRÃO_BONJA_MODELOS.pdf';
import medidasPdf from '../../assets/TERCEIRÃO_BONJA_MEDIDAS.pdf';

import './styles.css';
import './responsiveStyles.css';

function Home() {
  const [demands, setDemands] = useState([]);
  const [viewDeleted, setViewDeleted] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const sessionExpiritation = localStorage.getItem('sessionExpiration');

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
        const demandsResult = res.data;

        const deletedDemands = demandsResult.filter((demand) => demand.deleted);
        const notDeletedDemands = demandsResult.filter((demand) => !demand.deleted);

        const finalDemands = [...notDeletedDemands, ...deletedDemands];

        setDemands(finalDemands);
      })
      .catch();
  }

  useEffect(() => {
    loadDemands();
    const interval = setInterval(loadDemands, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!sessionExpiritation || Date.now() > sessionExpiritation) {
    localStorage.clear();
    return <Redirect to="/login" />;
  }

  const [firstName] = user.name.split(' ');

  function checkDeletedDemandsRendering() {
    if (demands.length <= 1) return false;

    const existsDeleted = demands.reduce((acc, demand) => {
      if (demand.deleted) return true;

      return acc;
    }, false);

    const existsNotDeleted = demands.reduce((acc, demand) => {
      if (!demand.deleted) return true;

      return acc;
    }, false);

    return existsDeleted && existsNotDeleted;
  }

  function renderDemands() {
    const localDemands = [...demands];

    const filteredDemands = localDemands.filter((demand) => {
      if (
        localDemands.length > 1
        && !viewDeleted
        && demand.deleted
        && checkDeletedDemandsRendering()
      ) {
        return false;
      }

      return true;
    });

    return filteredDemands.map((demand) => (
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
              {formatFirstName(firstName)}
            </h2>

            <Link
              to="/login"
              onClick={() => { localStorage.clear(); }}
              className="exit"
            >
              <FiLogOut />
              Sair
            </Link>
          </div>

          <section className="options-section">
            <Link className="button" to="/instructions">
              <span className="button-text">
                Instruções
                <MdDescription />
              </span>
            </Link>

            <a
              className="button"
              href={medidasPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="button-text">
                Tabelas de medidas
                <MdPictureAsPdf />
              </span>
            </a>

            <a
              className="button"
              href={modelosPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="button-text">
                Layouts/Modelos
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
            <div className="row">
              <h3 className="demands-section-title">Meus pedidos</h3>

              {checkDeletedDemandsRendering() ? (
                <label htmlFor="view-deleted" className="view-deleted">
                  <input
                    type="checkbox"
                    id="view-deleted"
                    checked={viewDeleted}
                    onChange={(e) => setViewDeleted(e.target.checked)}
                  />
                  Vizualizar cancelados
                </label>
              ) : ''}

            </div>
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
