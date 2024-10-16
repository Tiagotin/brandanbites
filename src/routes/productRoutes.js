// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Crear un nuevo producto (solo admin)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, productController.createProduct);

// Otros endpoints: actualizar, eliminar, obtener por ID
// ...

module.exports = router;
