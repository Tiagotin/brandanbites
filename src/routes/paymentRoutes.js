const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Procesar el pago
router.post('/', verifyToken, paymentController.processPayment);

// Obtener el estado de un pago
router.get('/:id', verifyToken, paymentController.getPaymentStatus);

module.exports = router;
