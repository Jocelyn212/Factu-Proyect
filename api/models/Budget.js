const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const budgetSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  services: [serviceSchema],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', budgetSchema);