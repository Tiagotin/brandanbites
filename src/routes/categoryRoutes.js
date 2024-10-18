const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

// Crear una nueva categoría (solo admin)
router.post('/', verifyToken, isAdmin, categoryController.createCategory);

// Actualizar una categoría (solo admin)
router.put('/:id', verifyToken, isAdmin, categoryController.updateCategory);

// Eliminar una categoría (solo admin)
router.delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory);

module.exports = router;
