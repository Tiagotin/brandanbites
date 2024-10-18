const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Crear un nuevo producto (solo accesible para administradores)
router.post('/', verifyToken, isAdmin, productController.createProduct);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Actualizar un producto
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Eliminar un producto
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
