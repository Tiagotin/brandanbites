// src/models/Transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Payment = require('./Payment');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ticketCode: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'historial_transacciones',
  timestamps: true,
});

// Relaciones
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Payment.hasMany(Transaction, { foreignKey: 'paymentId' });
Transaction.belongsTo(Payment, { foreignKey: 'paymentId' });

module.exports = Transaction;
