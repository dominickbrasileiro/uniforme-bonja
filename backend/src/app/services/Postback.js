const pagarme = require('pagarme');
const qs = require('qs');

const Demand = require('../models/DemandModel');
const Boleto = require('../models/BoletoModel');

module.exports = async (req, res) => {
  const { current_status, id: tid } = req.body;
  const { amount, boleto_url, boleto_barcode } = req.body.transaction;
  const { id, owner_id } = req.body.transaction.metadata.demand;
  const { 'x-hub-signature': signature } = req.headers;

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

  await demand.updateOne({ status: current_status });

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
    });

    await boleto.save();
  }

  return res.json(boleto);
};
