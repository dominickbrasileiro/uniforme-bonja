const Demand = require('../models/DemandModel');
const User = require('../models/UserModel');
const Boleto = require('../models/BoletoModel');
const Transaction = require('../models/TransactionModel');

async function getDemandsWithOwner(demands) {
  // Return an array of promises to get demand's owner name
  const promises = demands.map((obj) => {
    const demand = { ...obj };

    return new Promise((resolve, reject) => {
      const promise = User.findById(demand.user_id)
        .select(['name', 'email'])
        .then((result) => {
          resolve({ owner: result.name, email: result.email, ...demand });
        })
        .catch((err) => reject(err));

      return promise;
    });
  });

  // Execute all promises in array
  const demandsWithOwner = await Promise.all(promises);

  return demandsWithOwner;
}

async function getDemandsWithTid(demands) {
  // Return an array of promises to get demand's owner name
  const promises = demands.map((obj) => {
    const demand = { ...obj };

    const Option = demand.payment_method === 'boleto' ? Boleto : Transaction;

    return new Promise((resolve, reject) => {
      const promise = Option.findOne({ owner_id: demand.user_id })
        .select('tid')
        .then((result) => {
          delete demand.user_id;
          delete demand.payment_method;
          resolve({ tid: result.tid, ...demand });
        })
        .catch((err) => reject(err));

      return promise;
    });
  });

  // Execute all promises in array
  const demandsWithTid = await Promise.all(promises);

  return demandsWithTid;
}

module.exports = async (req, res) => {
  const demandsResult = await Demand.find({ status: 'paid' }, { _id: 0 }).select([
    'payment_method',
    'items',
    'user_id',
  ]);

  // Clone demands object without the methods
  const demands = JSON.parse(JSON.stringify(demandsResult));

  const demandsDataset = [];

  demands.forEach((demand) => Object.entries(demand.items).forEach((item) => {
    const [name, options] = item;

    demandsDataset.push({
      type: name,
      size: options.size,
      amount: options.amount,
    });
  }));

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
  const demandsWithTid = await getDemandsWithTid(demandsWithOwner);

  return res.json({
    dataset: demandsDataset,
    demands: demandsWithTid,
  });
};
