const Boleto = require('../models/BoletoModel');

module.exports = {
  async index(req, res) {
    const { userId } = req;

    const boletos = await Boleto.find().where({ owner_id: userId });

    return res.json(boletos);
  },

  async show(req, res) {
    const { demand_id } = req.params;
    const { userId } = req;

    const boleto = await Boleto.findOne().where({ demand_id });

    if (!boleto) {
      return res.status(400).json({ error: 'Boleto não encontrado' });
    }

    if (boleto.owner_id !== userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    return res.json(boleto);
  },
};
