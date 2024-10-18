const express = require('express');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password, telefono } = req.body;

  try {
    // Verifica si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ mensaje: 'El email ya está registrado.' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      telefono,
      rol: 'usuario', // Asignar rol de usuario por defecto
      activo: true,
    });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', user });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Autenticación (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, rol: user.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener perfil de usuario autenticado (ruta protegida)
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    // Obtiene la información del usuario autenticado
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Excluir la contraseña
    });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

module.exports = router;
