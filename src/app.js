// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db'); //conexion bd

//rutas
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const app = express();


// Conectar a la base de datos
connectDB();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: 'http://tu-dominio.com', // Reemplaza con tu dominio frontend
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 solicitudes por IP
});
app.use(limiter);

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/carrito', cartRoutes);
app.use('/api/transacciones', transactionRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Endpoint no encontrado' });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
