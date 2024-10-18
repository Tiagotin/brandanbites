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
    type: DataTypes.ENUM('completado', 'pendiente', 'cancelado'), // Usar ENUM para estados específicos
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
User.hasMany(Transaction, { foreignKey: 'id_usuario' }); // Cambié a 'id_usuario' para mantener la consistencia
Transaction.belongsTo(User, { foreignKey: 'id_usuario' });

Payment.hasMany(Transaction, { foreignKey: 'id_pago' }); // Cambié a 'id_pago'
Transaction.belongsTo(Payment, { foreignKey: 'id_pago' });

module.exports = Transaction;
