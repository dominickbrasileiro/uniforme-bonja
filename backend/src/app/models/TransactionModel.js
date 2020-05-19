const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  owner_id: String,
  demand_id: String,
  tid: String,
  current_status: String,

  refuse_reason: {
    type: String,
    default: null,
  },

  amount: Number,
  card_holder_name: String,
  card_last_digits: String,
  card_first_digits: String,
  card_brand: String,
  installments: Number,
}, { timestamps: true });

module.exports = mongoose.model('transactions', transactionSchema);
