const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Obtener el carrito del usuario
router.get('/', verifyToken, cartController.getCart);

// Agregar un producto al carrito
router.post('/add', verifyToken, cartController.addToCart);

// Eliminar un producto del carrito
router.delete('/remove/:itemId', verifyToken, cartController.removeFromCart);

// Vaciar el carrito
router.delete('/clear', verifyToken, cartController.clearCart);

module.exports = router;
