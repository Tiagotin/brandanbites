// src/middlewares/validateMiddleware.js
exports.validateRegistration = (req, res, next) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Por favor, completa todos los campos.' });
    }
    next();
  };
  
  // Similar para otras validaciones
  