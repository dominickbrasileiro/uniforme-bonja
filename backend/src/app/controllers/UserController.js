const { promisify } = require('util');
const User = require('../models/UserModel');
const generatePin = require('../../utils/generatePin');
const SendMail = require('../../lib/SendMail');
const mailMessage = require('../../assets/js/mailMessage');

module.exports = {
  async store(req, res) {
    const { name, enrollment, group } = req.body;
    const userExists = await User.findOne().where({ enrollment });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    const access_pin = generatePin(6);

    const user = new User({
      name, enrollment, group, access_pin,
    });

    await user.save();

    await promisify(SendMail)({
      to: `${name} <${enrollment}@ielusc.br>`,
      subject: 'Cadastro efetuado com sucesso!',
      html: mailMessage({
        name, enrollment, access_pin, frontendUrl: process.env.FRONTEND_URL,
      }),
    });

    return res.status(204).send();
  },
};
