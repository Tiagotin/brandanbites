// src/models/CartItem.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CartItem extends Model {}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
}, {
  sequelize,
  modelName: 'CartItem',
  tableName: 'detalle_carritos',
  timestamps: true,
});

module.exports = CartItem;
