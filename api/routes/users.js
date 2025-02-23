const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); // Asegúrate de que este modelo esté correctamente configurado

const router = express.Router();

// RUTA: LOGIN
router.post(
  '/login',
  [
    check('email', 'Por favor ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
      }

      // Comparar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
      }

      // Crear token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ success: true, message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
);

module.exports = router;


