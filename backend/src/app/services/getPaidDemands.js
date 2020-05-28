const Demand = require('../models/DemandModel');
const User = require('../models/UserModel');

async function getDemandsWithOwner(demands) {
  // Return an array of promises to get demand's owner name
  const promises = demands.map((obj) => {
    const demand = { ...obj };

    return new Promise((resolve, reject) => {
      const promise = User.findById(demand.user_id)
        .select('name')
        .then((result) => {
          delete demand.user_id;
          resolve({ owner: result.name, ...demand });
        })
        .catch((err) => reject(err));

      return promise;
    });
  });

  // Execute all promises in array
  const demandsWithOwner = await Promise.all(promises);

  return demandsWithOwner;
}

module.exports = async (req, res) => {
  const demandsResult = await Demand.find({ status: 'paid' }, { _id: 0 }).select([
    'items',
    'user_id',
  ]);

  // Clone demands object without the methods
  const demands = JSON.parse(JSON.stringify(demandsResult));

  const formatedDemands = demands.map((obj) => {
    const demand = { ...obj };

    Object.entries(demand.items).forEach((item) => {
      const [name, options] = item;
      demand[name] = `${options.amount}x - ${options.size}`;
    });

    delete demand.items;

    return demand;
  });

  const demandsWithOwner = await getDemandsWithOwner(formatedDemands);

  return res.json(demandsWithOwner);
};
