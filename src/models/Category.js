// src/models/Category.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categorias',
  timestamps: true,
});

module.exports = Category;
