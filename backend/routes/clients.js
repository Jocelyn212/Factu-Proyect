const express = require('express');
const router = express.Router();
const Client = require('../../backend/models/Client');
const auth = require('../middleware/auth');

// Obtener todos los clientes
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo cliente
router.post('/', auth, async (req, res) => {
  const client = new Client({
    name: req.body.name,
    address: req.body.address,
    nif: req.body.nif,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;