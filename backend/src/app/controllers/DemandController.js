const getDemandPrice = require('../../lib/getDemandPrice');

const Demand = require('../models/DemandModel');

module.exports = {
  async show(req, res) {
    const { demandId } = req.params;
    const { userId } = req;

    const demand = await Demand.findById(demandId);

    if (!demand) {
      return res.status(400).json({ error: 'Pedido não encontrado' });
    }

    if (demand.user_id !== userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    return res.json(demand);
  },
  async store(req, res) {
    const user_id = req.userId;

    const price = getDemandPrice(req.body);

    const demand = new Demand({ user_id, price, items: { ...req.body } });

    await demand.save();

    return res.status(204).send();
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.userId;

    try {
      const demand = await Demand.findById(id);

      if (demand.user_id !== user_id) {
        return res.status(401).json({ statusCode: 401, error: 'Unauthorized' });
      }

      if (demand.deleted || demand.status !== 'created') {
        return res.status(400).json({ error: 'Não foi possível cancelar o pedido' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Pedido não encontrado' });
    }

    await Demand.findByIdAndUpdate(id, { deleted: true });

    return res.status(204).send();
  },
};
