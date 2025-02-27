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

const mongoose = require('mongoose');

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

InvoiceSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastInvoice = await mongoose.model('Invoice').findOne().sort({ createdAt: -1 });
    const lastNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber.split("/")[0], 10) : 0;
    const newNumber = (lastNumber + 1).toString().padStart(2, "0");
    this.invoiceNumber = `${newNumber}/2025`;
    this.createdAt = new Date().toISOString().split("T")[0];
  }
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema); 
