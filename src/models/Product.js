// src/models/Product.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 después del decimal
    allowNull: false,
  },
  cantidad_disponible: { // Renombrado desde 'stock' para mejor claridad
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Aseguramos que siempre tenga un valor por defecto
    validate: {
      min: 0, // No se permite inventario negativo
    },
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'agotado', 'descontinuado'),
    defaultValue: 'disponible', // Estado inicial del producto
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias', // Hace referencia a la tabla de categorías
      key: 'id',
    },
    onUpdate: 'CASCADE', // Si la categoría se actualiza, también lo hará en los productos
    onDelete: 'SET NULL', // Si la categoría se borra, deja el producto sin categoría
  },
  imagen_url: {
    type: DataTypes.STRING, // URL de la imagen del producto
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'productos',
  timestamps: true, // Incluye createdAt y updatedAt
});

module.exports = Product;
