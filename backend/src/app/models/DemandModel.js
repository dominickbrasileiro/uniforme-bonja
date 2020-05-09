const mongoose = require('mongoose');

const demandSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  price: {
    type: Number,
  },
  items: {
    type: Object,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Demand', demandSchema);
