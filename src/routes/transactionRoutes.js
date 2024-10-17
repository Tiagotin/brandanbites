const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Obtener todas las transacciones del usuario
router.get('/', verifyToken, transactionController.getUserTransactions);

// Obtener una transacción específica por ID
router.get('/:id', verifyToken, transactionController.getTransactionById);

module.exports = router;
