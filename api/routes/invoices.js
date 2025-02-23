const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

// Obtener todas las facturas (opción de búsqueda por cliente o número de factura)
router.get('/', async (req, res) => {
  try {
    const { clientName, invoiceNumber } = req.query;
    let filter = {};

    if (clientName) {
      filter.clientName = new RegExp(clientName, 'i'); // Búsqueda flexible
    }

    if (invoiceNumber) {
      filter.invoiceNumber = invoiceNumber;
    }

    const invoices = await Invoice.find(filter);

    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No se encontraron facturas' });
    }

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las facturas', error });
  }
});

// Crear una nueva factura
router.post('/', async (req, res) => {
  try {
    const { clientName, clientAddress, clientNIF, invoiceNumber, services, vat } = req.body;

    if (!clientName || !clientAddress || !clientNIF || !invoiceNumber || !services.length) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Calcular total antes de IVA
    const totalAmount = services.reduce((acc, item) => acc + item.amount, 0);
    const total = totalAmount + (totalAmount * (vat / 100));

    const newInvoice = new Invoice({
      clientName,
      clientAddress,
      clientNIF,
      invoiceNumber,
      services,
      totalAmount,
      vat,
      total
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la factura', error });
  }
});

// Obtener una factura por ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura', error });
  }
});

// Actualizar una factura por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la factura', error });
  }
});

// Eliminar una factura por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json({ message: 'Factura eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la factura', error });
  }
});

module.exports = router;


