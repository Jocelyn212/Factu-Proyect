const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    nif: req.body.nif,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un cliente específico
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      Object.assign(client, req.body);
      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      await client.remove();
      res.json({ message: 'Cliente eliminado' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;