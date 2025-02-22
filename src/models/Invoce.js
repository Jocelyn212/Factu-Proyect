const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientAddress: { type: String },
  clientNIF: { type: String },
  invoiceNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  services: [
    {
      description: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  vat: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);