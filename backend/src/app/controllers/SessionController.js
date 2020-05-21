const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const User = require('../models/UserModel');


module.exports = {
  async store(req, res) {
    const { enrollment, access_pin } = req.body;

    const user = await User.findOne().where({ enrollment });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (user.access_pin !== access_pin) {
      return res.status(400).json({ error: 'Chave de acesso incorreta' });
    }

    if (!user.already_accessed) {
      await user.updateOne({ already_accessed: true });
    }

    const { id, name, admin } = user;

    return res.json({
      user: { name, enrollment, admin },
      token: jwt.sign({ id, admin }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
