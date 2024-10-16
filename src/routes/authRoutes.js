// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middlewares/validateMiddleware');

// Ruta de registro
router.post('/register', validateRegistration, authController.register);

// Ruta de login
router.post('/login', validateLogin, authController.login);

module.exports = router;
