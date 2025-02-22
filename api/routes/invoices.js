const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const auth = require('../middleware/auth');

// Obtener todas las facturas
router.get('/', auth, async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva factura
router.post('/', auth, async (req, res) => {
  const invoice = new Invoice({
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientNIF: req.body.clientNIF,
    invoiceNumber: req.body.invoiceNumber,
    createdAt: req.body.createdAt,
    services: req.body.services,
    totalAmount: req.body.totalAmount,
    vat: req.body.vat,
    total: req.body.total,
  });

  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener una factura por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice == null) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;