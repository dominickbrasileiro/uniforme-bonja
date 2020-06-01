/* eslint-disable no-param-reassign */
const translatedKeys = require('../assets/translatedKeys.json');

module.exports = {
  dataset(dataset) {
    const mapped = dataset.map((item) => {
      item.type = translatedKeys[item.type] || item.type;

      return item;
    });

    mapped.forEach((item) => {
      Object.keys(item).forEach((key) => {
        const translatedKey = translatedKeys[key];

        if (translatedKey) {
          item[translatedKey] = item[key];
          delete item[key];
        }
      });
    });

    return mapped;
  },

  demands(demands) {
    demands.forEach((demand) => {
      Object.keys(demand).forEach((key) => {
        const translatedKey = translatedKeys[key];

        if (translatedKey) {
          demand[translatedKey] = demand[key];
          delete demand[key];
        }
      });
    });

    return demands;
  },
};
