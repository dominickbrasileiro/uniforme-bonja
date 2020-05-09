const getDemandPrice = require('../../lib/getDemandPrice');

const Demand = require('../models/DemandModel');

module.exports = {
  async store(req, res) {
    try {
      const user_id = req.userId;

      const price = getDemandPrice(req.body);

      const demand = new Demand({ user_id, price, items: { ...req.body } });

      await demand.save();

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ statusCode: 500, error: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      try {
        const demand = await Demand.findById(id);

        if (demand.user_id !== user_id) {
          return res.status(401).json({ statusCode: 401, error: 'Unauthorized' });
        }
      } catch (error) {
        return res.status(400).json({ error: 'Pedido não encontrado' });
      }

      await Demand.findByIdAndUpdate(id, { deleted: true });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ m: error, statusCode: 500, error: 'Internal server error' });
    }
  },
};
