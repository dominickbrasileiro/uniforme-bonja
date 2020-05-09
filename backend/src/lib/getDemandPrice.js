const prices = require('../assets/prices.json');

function getDemandPrice(demand) {
  const items = Object.entries(demand);

  const itemsWithPrice = items.map((item) => {
    const [name, options] = item;
    const price = options.amount * prices[name];

    return [name, { ...options, price }];
  });

  const demandWithPrice = Object.fromEntries(new Map([...itemsWithPrice]));
  const objects = Object.values(demandWithPrice);

  return objects.reduce((price, object) => price + object.price, 0);
}

module.exports = getDemandPrice;
