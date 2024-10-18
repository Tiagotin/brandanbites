// src/models/Payment.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Payment extends Model {
  // Método para cambiar el estado del pago
  cambiarEstado(nuevoEstado) {
    this.status = nuevoEstado;
    return this.save();
  }
}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'), // Usar ENUM para los estados posibles
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'pagos',
  timestamps: true,
});

// Relaciones (asegúrate de que las claves foráneas sean consistentes)
Payment.associate = (models) => {
  Payment.belongsTo(models.User, { foreignKey: 'id_usuario' }); // Asegúrate de que haya una relación con User
  Payment.hasMany(models.Transaction, { foreignKey: 'id_pago' }); // Consistencia en nombres
};

module.exports = Payment;
