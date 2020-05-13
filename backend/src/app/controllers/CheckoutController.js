const pagarme = require('pagarme');

const Demand = require('../models/DemandModel');
const Boleto = require('../models/BoletoModel');

const items = require('../../assets/items.json');

module.exports = {
  async store(req, res) {
    const demandId = req.params.id;
    const { userId } = req;
    const { name, cpf } = req.body;

    const demand = await Demand.findById(demandId);

    if (!demand) {
      return res.status(400).json({ error: 'Pedido não encontrado' });
    }

    if (demand.user_id !== userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (await Boleto.findOne().where({ demand_id: demand.id })) {
      return res.status(400).json({ error: 'Boleto já existente' });
    }

    const info = {};

    info.amount = demand.price * 100;

    const itemsArray = [...Object.entries(demand.items)];

    info.items = itemsArray.map((item) => {
      const [itemName, options] = item;

      const obj = {
        id: itemName,
        title: items[itemName].name,
        unit_price: Math.floor(items[itemName].price * 100),
        quantity: options.amount,
        tangible: true,
      };

      return obj;
    });

    const client = await pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY });

    const transaction = await client.transactions.create({
      amount: info.amount,
      payment_method: 'boleto',
      soft_descriptor: process.env.BOLETO_DESCRIPTOR,
      boleto_instructions: process.env.BOLETO_INSTRUCTIONS,
      postback_url: `${process.env.PAGARME_POSTBACK_URL}/checkout/postback`,
      metadata: {
        demand: {
          id: demandId,
          owner_id: userId,
        },
      },
      customer: {
        type: 'individual',
        country: 'br',
        name,
        documents: [{
          type: 'cpf',
          number: cpf,
        }],
      },
      items: info.items,
    });

    await demand.updateOne({ status: transaction.status });

    return res.status(204).send();
  },
};
