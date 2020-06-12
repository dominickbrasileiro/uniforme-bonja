import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';


function Login() {
  return (
    <div className="instructions-wrap">
      <div className="instructions-container">
        <div className="instructions-text">

          <h1>Instruções:</h1>

          <div className="opt">
            <h2>
              <span role="img" aria-label="finger emoji">👉</span>
              {' '}
              Modelos
            </h2>
            <ul>
              <li>
                É necessária a compra da camiseta (manga degradê)
                para a foto oficial do Terceirão Bonja 2020.
              </li>
              <li>
                Todos os professores receberão uma camiseta (manga degradê)
                de presente, sendo possível a compra de mais peças através do site.
              </li>
            </ul>
          </div>

          <div className="opt">
            <h2>
              <span role="img" aria-label="finger emoji">👉</span>
              {' '}
              Detalhes
            </h2>
            <ul>
              <li>
                Devido ao formato degradê, o detalhe em cada peça fica diferente.
                Uma peça terá mais detalhes em pink do que outras, por exemplo.
              </li>
              <li>
                Nos modelos de corta vento e camiseta manga degradê os detalhes
                também ficam diferentes uns dos outros,
                devido a dimensão por tamanho.
              </li>
            </ul>
          </div>

          <div className="opt">
            <h2>
              <span role="img" aria-label="finger emoji">👉</span>
              {' '}
              Tamanhos
            </h2>
            <ul>
              <li>
                Não será aceito
                {' '}
                <strong>NENHUMA</strong>
                {' '}
                troca de tamanho após
                o pedido ser confirmado e/ou recebido.
                (Por isso observe bem a tabela de medidas,
                e qualquer dúvida que tiver, tire antes de efetuar a compra).
              </li>
              <li>
                Cada empresa tem suas medidas próprias,
                por isso analise a tabela base da Jana Jô,
                e não apenas a etiqueta de alguma peça sua.
              </li>
            </ul>
          </div>

          <div className="opt">
            <h2>
              <span role="img" aria-label="finger emoji">👉</span>
              {' '}
              Pagamento
            </h2>
            <ul>
              <li>
                No site você terá as seguintes opções de pagamento:
                <ul className="sub">
                  <li>Via boleto;</li>
                  <li>
                    Via cartão de crédito em até 3 vezes sem juros.
                    (Parcela mínima R$ 50,00). Aproveite essa vantagem para comprar todas
                    as peças que desejar, usar muito e depois guardá-las como lembrança.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="opt">
            <h2>
              <span role="img" aria-label="finger emoji">👉</span>
              {' '}
              Prazo
            </h2>
            <ul>
              <li>
                O pagamento de todos os pedidos deverá ser realizado
                até o dia 30/06/2020. Não será possível cadastrar mais pedidos
                e efetuar pagamentos após este prazo.
              </li>
            </ul>
          </div>

          <div className="button-container">
            <Link to="/" className="button">Ok, Entendi!</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
