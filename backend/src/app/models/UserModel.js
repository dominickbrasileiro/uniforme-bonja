const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
    unique: true,
  },
  group: {
    type: String,
    required: true,
  },
  access_pin: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
