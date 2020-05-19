const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema({
  owner_id: String,
  demand_id: String,
  tid: String,
  current_status: String,
  amount: Number,
  boleto_url: String,
  boleto_barcode: String,
  boleto_expiration_date: String,
}, { timestamps: true });

module.exports = mongoose.model('Boleto', boletoSchema);
