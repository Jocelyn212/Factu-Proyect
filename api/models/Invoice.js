/* const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  services: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  vat: { type: Number, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Invoice', InvoiceSchema); */

/* const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  clientAddress: {
    type: String,
  },
  clientNif: {
    type: String,
  },
 
  clientPhone: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  services: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  vat: { type: Number, required: true },
  total: { type: Number, required: true }
});


InvoiceSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Encuentra la última factura creada y obtiene el número más alto
      const lastInvoice = await mongoose.model('Invoice').findOne().sort({ createdAt: -1 });
      let lastNumber = 0;

      if (lastInvoice) {
        lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[0], 10) || 0;
      }

      let newNumber = (lastNumber + 1).toString().padStart(2, "0");
      
      // Verifica si este número ya existe y ajusta si es necesario
      let existingInvoice = await mongoose.model('Invoice').findOne({ invoiceNumber: `${newNumber}/2025` });

      while (existingInvoice) {
        lastNumber += 1;
        newNumber = (lastNumber).toString().padStart(2, "0");
        existingInvoice = await mongoose.model('Invoice').findOne({ invoiceNumber: `${newNumber}/2025` });
      }

      this.invoiceNumber = `${newNumber}/2025`;
      this.createdAt = new Date().toISOString().split("T")[0];

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


module.exports = mongoose.model('Invoice', InvoiceSchema);  */

const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientAddress: { type: String },
  clientNif: { type: String },
  clientPhone: { type: String },
  createdAt: { type: Date, default: Date.now },
  services: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  vat: { type: Number, required: true },
  total: { type: Number, required: true }
});

// 🔹 Generar un número de factura único antes de guardar
InvoiceSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      let lastInvoice = await mongoose.model('Invoice').findOne().sort({ invoiceNumber: -1 });

      let lastNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber.split("/")[0], 10) : 0;
      let newNumber = (lastNumber + 1).toString().padStart(2, "0");

      // 🔹 Verificar si el número ya existe y seguir aumentando hasta encontrar uno disponible
      let existingInvoice = await mongoose.model('Invoice').findOne({ invoiceNumber: `${newNumber}/2025` });

      while (existingInvoice) {
        lastNumber++;
        newNumber = lastNumber.toString().padStart(2, "0");
        existingInvoice = await mongoose.model('Invoice').findOne({ invoiceNumber: `${newNumber}/2025` });
      }

      this.invoiceNumber = `${newNumber}/2025`;
      this.createdAt = new Date().toISOString().split("T")[0];

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
