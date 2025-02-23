const express = require('express');
const { check, validationResult } = require('express-validator');
const Client = require('../models/Client');

const router = express.Router();

// Obtener todos los clientes
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Crear un nuevo cliente
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email válido').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, address, nif, email, phone } = req.body;

    try {
      let client = await Client.findOne({ email });
      if (client) {
        return res.status(400).json({ success: false, message: 'El cliente ya existe' });
      }

      client = new Client({ name, address, nif, email, phone });
      await client.save();

      res.status(201).json({ success: true, message: 'Cliente añadido', client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
);

module.exports = router;
