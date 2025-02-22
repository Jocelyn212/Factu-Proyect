/* const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Obtener todas las facturas
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva factura
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

module.exports = router; */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongo-config');
const invoicesRouter = require('./routes/invoices');
const usersRouter = require('./routes/users');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/invoices', invoicesRouter);
app.use('/api/users', usersRouter);
app.use('/api/clients', clientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});