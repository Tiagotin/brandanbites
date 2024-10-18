// src/models/User.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      is: /^[a-zA-Z0-9._%+-]+@insi\.edu\.ar$/, // Solo permite emails con el dominio @insi.edu.ar
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario',
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true, // Opcional
    validate: {
      len: [10, 15], // Longitud mínima y máxima para teléfonos
    },
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // El usuario está activo por defecto
  },
  fecha_ultimo_acceso: {
    type: DataTypes.DATE,
    allowNull: true, // Se actualizará cuando el usuario inicie sesión
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'usuarios',
  timestamps: true, // Incluye createdAt y updatedAt
});

module.exports = User;
