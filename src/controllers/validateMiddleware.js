// src/middlewares/validateMiddleware.js

// Validación para registro de usuario
exports.validateRegistration = (req, res, next) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Por favor, completa todos los campos.' });
    }
    next();
  };
  
  // Validación para login de usuario
  exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Por favor, completa todos los campos.' });
    }
    next();
  };
  