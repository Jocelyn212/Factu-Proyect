const express = require('express');
const Budget = require('../models/Budget');
const router = express.Router();

// Crear un nuevo presupuesto
router.post('/', async (req, res) => {
  try {
    const { clientName, clientPhone, services } = req.body;
    const total = services.reduce((sum, service) => sum + service.price, 0);
    const budget = new Budget({ clientName, clientPhone, services, total });
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los presupuestos
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un presupuesto por ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un presupuesto
router.put('/:id', async (req, res) => {
  try {
    const { clientName, clientPhone, services } = req.body;
    const total = services.reduce((sum, service) => sum + service.price, 0);
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { clientName, clientPhone, services, total },
      { new: true }
    );
    if (!budget) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;