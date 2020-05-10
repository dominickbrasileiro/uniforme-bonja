
const Demand = require('../models/DemandModel');

module.exports = {
  async index(req, res) {
    const id = req.userId;

    const demands = await Demand.find({ user_id: id })
      .sort('deleted')
      .sort('createdAt')
      .exec((error, result) => {
        if (error) throw error;

        return res.json(result);
      });

    return demands;
  },
};
