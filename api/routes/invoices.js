const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Crear una nueva factura
router.post('/', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las facturas
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una factura por ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Actualizar una factura (solo servicios)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { services, totalAmount, vat, total } = req.body;

  try {
    // Verificar si la factura existe
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Factura no encontrada'
      });
    }

    // Actualizar solo los campos permitidos (servicios y totales)
    // Mantenemos los datos del cliente, número de factura y fecha intactos
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        services,
        totalAmount,
        vat,
        total
      },
      { new: true } // Esto hace que devuelva el documento actualizado
    );

    res.json({
      success: true,
      message: 'Factura actualizada correctamente',
      invoice: updatedInvoice
    });
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la factura',
      error: error.message
    });
  }
});

module.exports = router;