const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto específico
router.get('/:id', productController.getProductById);

// Crear un nuevo producto (solo admin)
router.post('/', verifyToken, isAdmin, productController.createProduct);

// Actualizar un producto (solo admin)
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Eliminar un producto (solo admin)
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
