require('dotenv/config');
require('./config/database');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

require('express-async-errors');
const routes = require('./routes');
const rateLimitConfig = require('./config/rateLimit');

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitConfig);

app.use(routes);

app.use(errors());

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ error: 'Erro interno no servidor. Avise o incompetente do Dominick pra ele resolver, obrigado.' });
  }

  return res.status(204).end();
});

module.exports = app;
