const pagarme = require('pagarme');
const { cpf: cpfValidator } = require('cpf-cnpj-validator');

const Demand = require('../models/DemandModel');
const Boleto = require('../models/BoletoModel');

const items = require('../../assets/items.json');

module.exports = {
  async store(req, res) {
    const demandId = req.params.id;
    const { userId } = req;
    const {
      name,
      cpf,
      email,
      phone,
      payment_method,
      card_hash,
      installments,
    } = req.body;

    const isBoleto = payment_method === 'boleto';

    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({ error: 'Invalid CPF' });
    }

    const demand = await Demand.findById(demandId);

    if (!demand || demand.deleted) {
      return res.status(400).json({ error: 'Pedido não encontrado' });
    }

    if (demand.user_id !== userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (isBoleto && await Boleto.findOne().where({ demand_id: demand.id })) {
      return res.status(400).json({ error: 'Boleto já existente' });
    }

    if (demand.status !== 'created') {
      return res.status(400).json({ error: 'Transação já cadastrada' });
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

    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
      encryption_key: process.env.PAGARME_ENCRYPTION_KEY,
    });

    const transaction = await client.transactions.create({
      amount: info.amount,
      payment_method,
      boleto_instructions: isBoleto ? process.env.BOLETO_INSTRUCTIONS : null,
      card_hash: !isBoleto ? card_hash : null,
      installments: !isBoleto ? installments : null,
      postback_url: `${process.env.PAGARME_POSTBACK_URL}/checkout/postback`,
      metadata: {
        demand: {
          id: demandId,
          owner_id: userId,
        },
      },
      customer: {
        external_id: userId,
        type: 'individual',
        country: 'br',
        name,
        email,
        phone_numbers: [phone],
        documents: [{
          type: 'cpf',
          number: cpf,
        }],
      },
      billing: {
        name: process.env.BILLING_NAME,
        address: {
          country: process.env.BILLING_COUNTRY,
          state: process.env.BILLING_STATE,
          city: process.env.BILLING_CITY,
          neighborhood: process.env.BILLING_NEIGHBORHOOD,
          street: process.env.BILLING_STREET,
          street_number: process.env.BILLING_STREET_NUMBER,
          zipcode: process.env.BILLING_ZIPCODE,
        },
      },
      items: info.items,
    });

    await demand.updateOne({ status: transaction.status });

    return res.status(204).send();
  },
};