// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un pago
router.post('/', authMiddleware.verifyToken, paymentController.createPayment);

// Otras rutas relacionadas con pagos


//notificaciones
router.post('/notifications', paymentController.handleNotification);

// ...

module.exports = router;
