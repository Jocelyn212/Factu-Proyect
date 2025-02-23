const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Registro de usuario
router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Por favor ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  async (req, res) => {
    // Validar errores de Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
      }

      // Crear usuario
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      });

      await user.save();

      // Crear token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ success: true, message: 'Usuario registrado', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
);

module.exports = router;
