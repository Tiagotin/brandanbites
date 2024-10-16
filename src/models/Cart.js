// src/models/Cart.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carritos',
  timestamps: true,
});

module.exports = Cart;
