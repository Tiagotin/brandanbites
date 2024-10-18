const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Obtener perfil del usuario
router.get('/profile', verifyToken, userController.getProfile);

// Actualizar perfil del usuario
router.put('/profile', verifyToken, userController.updateProfile);

// Eliminar cuenta de usuario (solo administradores)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
