const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verificar token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añade el payload al objeto req
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};

// Verificar si el usuario es admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado. No tienes permisos de administrador.' });
  }
  next();
};
