const { promisify } = require('util');
const SendMail = require('../../lib/SendMail');
const mailMessage = require('../../assets/js/recoverMailMessage');

const User = require('../models/UserModel');

const formatFirstName = require('../../utils/formatFirstName');

module.exports = async (req, res) => {
  const { enrollment } = req.params;
  const user = await User.findOne().where({ enrollment });

  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  const { name, access_pin } = user;

  await promisify(SendMail)({
    to: `${name} <${enrollment}@ielusc.br>`,
    subject: 'Recuperação de chave de acesso',
    html: mailMessage({
      name: formatFirstName(name), enrollment, access_pin, frontendUrl: process.env.FRONTEND_URL,
    }),
  });

  return res.status(204).send();
};
