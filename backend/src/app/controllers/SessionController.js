const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

module.exports = {
  async store(req, res) {
    const { email, access_pin } = req.body;

    const user = await User.findOne().where({ email });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (user.access_pin !== access_pin) {
      return res.status(400).json({ error: 'Chave de acesso incorreta' });
    }

    if (!user.already_accessed) {
      await user.updateOne({ already_accessed: true });
    }

    const now = Math.floor(Date.now() / 1000);

    const expireDate = now + (30 * 60);

    const { id, name, admin } = user;

    const token = jwt.sign({
      id,
      admin,
      iat: now,
      exp: expireDate,
    }, process.env.APP_SECRET);

    res.header('X-Token-Expire-Date', expireDate);

    return res.json({
      user: { name, email, admin },
      token,
    });
  },
};
