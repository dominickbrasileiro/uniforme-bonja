const pagarme = require('pagarme');
const qs = require('qs');

const Demand = require('../models/DemandModel');
const Boleto = require('../models/BoletoModel');
const Transaction = require('../models/TransactionModel');

module.exports = async (req, res) => {
  const { current_status, id: tid } = req.body;
  const {
    amount,
    payment_method,
    boleto_url,
    boleto_barcode,
    boleto_expiration_date,
    card_holder_name,
    card_first_digits,
    card_last_digits,
    card_brand,
    installments,
    refuse_reason,
  } = req.body.transaction;
  const { id, owner_id } = req.body.transaction.metadata.demand;
  const { 'x-hub-signature': signature } = req.headers;

  const isBoleto = payment_method === 'boleto';

  try {
    pagarme.postback.verifySignature(
      process.env.PAGARME_API_KEY,
      qs.stringify(req.body),
      signature,
    );
  } catch (err) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const demand = await Demand.findById(id);

  await demand.updateOne({ status: current_status, payment_method });

  if (isBoleto) {
    let boleto = await Boleto.findOne().where({ tid });

    if (boleto) {
      await boleto.updateOne({ current_status });
    } else {
      boleto = new Boleto({
        owner_id,
        demand_id: id,
        tid,
        current_status,
        amount,
        boleto_url,
        boleto_barcode,
        boleto_expiration_date,
      });

      await boleto.save();
    }
  } else {
    let transaction = await Transaction.findOne().where({ tid });

    if (transaction) {
      await transaction.updateOne({ current_status });
    } else {
      transaction = new Transaction({
        owner_id,
        demand_id: id,
        tid,
        current_status,
        refuse_reason,
        amount,
        card_holder_name,
        card_first_digits,
        card_last_digits,
        card_brand,
        installments,
      });

      await transaction.save();
    }
  }

  return res.status(204).send();
};
