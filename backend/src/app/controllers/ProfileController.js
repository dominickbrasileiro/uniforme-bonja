
const Demand = require('../models/DemandModel');

module.exports = {
  async index(req, res) {
    try {
      const id = req.userId;

      return await Demand.find({ user_id: id })
        .sort('deleted')
	.sort('createdAt')
        .exec((error, result) => {
          if (error) throw error;

          return res.json(result);
        });
    } catch (error) {
      return res
        .status(500)
        .json({ statusCode: 500, error: 'Internal server error' });
    }
  },
};
