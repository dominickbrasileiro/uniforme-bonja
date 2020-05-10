require('dotenv/config');
require('./config/database');

const express = require('express');
const Sentry = require('@sentry/node');
const cors = require('cors');
const { errors } = require('celebrate');

require('express-async-errors');
const routes = require('./routes');
const sentryConfig = require('./config/sentry');

const app = express();

Sentry.init(sentryConfig);

app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(Sentry.Handlers.errorHandler());

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ error: 'Erro interno no servidor. Avise o incompetente do Dominick pra ele resolver, obrigado.' });
  }

  return res.status(204).end();
});

module.exports = app;
