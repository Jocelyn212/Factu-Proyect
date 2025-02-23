const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del cliente es obligatorio']
  },
  nif: {
    type: String,
    required: [true, 'El NIF es obligatorio'],
    unique: true
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);