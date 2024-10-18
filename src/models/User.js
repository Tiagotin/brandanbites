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
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol: {
    type: DataTypes.ENUM('usuario', 'admin'), // Define los roles
    defaultValue: 'usuario', // Por defecto será un usuario normal
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'usuarios',
  timestamps: true,
});

module.exports = User;
