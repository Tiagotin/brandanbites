const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de registro
router.post('/register', authController.register);  // Llama a la función "register" del controlador

// Ruta de inicio de sesión
router.post('/login', authController.login);  // Llama a la función "login" del controlador

// Ruta de logout
router.post('/logout', authController.logout);  // Llama a la función "logout" del controlador

module.exports = router;
