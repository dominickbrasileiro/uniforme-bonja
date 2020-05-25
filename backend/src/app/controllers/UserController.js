const { promisify } = require('util');
const User = require('../models/UserModel');
const generatePin = require('../../utils/generatePin');
const SendMail = require('../../lib/SendMail');
const mailMessage = require('../../assets/js/mailMessage');

const formatName = require('../../utils/formatName');
const formatFirstName = require('../../utils/formatFirstName');

module.exports = {
  async store(req, res) {
    const { name: rawName, email, type } = req.body;

    const name = formatName(rawName);

    const user = await User.findOne().where({ email });

    if (user && user.already_accessed) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    let access_pin;

    if (user && !user.already_accessed) {
      await user.updateOne({ name, type });

      access_pin = user.access_pin;
    } else {
      access_pin = generatePin(6);

      const newUser = new User({
        name, email, type, access_pin,
      });

      await newUser.save();
    }

    await promisify(SendMail)({
      to: `${name} <${email}>`,
      subject: 'Cadastro efetuado com sucesso!',
      html: mailMessage({
        name: formatFirstName(name),
        email,
        access_pin,
        frontendUrl: process.env.FRONTEND_URL,
      }),
    });

    return res.status(204).send();
  },
};
