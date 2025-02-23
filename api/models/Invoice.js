const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'El nombre del cliente es obligatorio']
  },
  clientAddress: {
    type: String,
    required: [true, 'La dirección del cliente es obligatoria']
  },
  clientNIF: {
    type: String,
    required: [true, 'El NIF del cliente es obligatorio']
  },
  invoiceNumber: {
    type: String,
    required: [true, 'El número de factura es obligatorio'],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  services: [{
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  vat: {
    type: Number,
    required: true,
    default: 21
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);