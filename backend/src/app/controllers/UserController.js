const { promisify } = require('util');
const User = require('../models/UserModel');
const generatePin = require('../../utils/generatePin');
const SendMail = require('../../lib/SendMail');
const mailMessage = require('../../assets/js/mailMessage');

const formatName = require('../../utils/formatName');
const formatFirstName = require('../../utils/formatFirstName');

module.exports = {
  async store(req, res) {
    const { name: rawName, enrollment, group } = req.body;

    const name = formatName(rawName);

    const user = await User.findOne().where({ enrollment });

    if (user && user.already_accessed) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    let access_pin;

    if (user && !user.already_accessed) {
      await user.updateOne({ name, group });

      access_pin = user.access_pin;
    } else {
      access_pin = generatePin(6);

      const newUser = new User({
        name, enrollment, group, access_pin,
      });

      await newUser.save();
    }

    await promisify(SendMail)({
      to: `${name} <${enrollment}@ielusc.br>`,
      subject: 'Cadastro efetuado com sucesso!',
      html: mailMessage({
        name: formatFirstName(name), enrollment, access_pin, frontendUrl: process.env.FRONTEND_URL,
      }),
    });

    return res.status(204).send();
  },
};
