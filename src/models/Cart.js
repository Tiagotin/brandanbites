// src/models/Cart.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Cart extends Model {
  // Método para finalizar el carrito
  static async finalizar(id) {
    const carrito = await this.findByPk(id);
    if (carrito) {
      carrito.estado = 'finalizado';
      return await carrito.save();
    }
    throw new Error('Carrito no encontrado');
  }

  // Método para cancelar el carrito
  static async cancelar(id) {
    const carrito = await this.findByPk(id);
    if (carrito) {
      carrito.estado = 'cancelado';
      return await carrito.save();
    }
    throw new Error('Carrito no encontrado');
  }
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Asumiendo que hay un modelo de Usuario
    references: {
      model: 'usuarios', // Nombre de la tabla
      key: 'id', // Clave primaria en la tabla de usuarios
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  estado: {
    type: DataTypes.ENUM('activo', 'finalizado', 'cancelado'),
    defaultValue: 'activo',
  },
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carritos',
  timestamps: true,
});

// Relación con Detalle_Carrito
Cart.associate = (models) => {
  Cart.hasMany(models.CartItem, {
    foreignKey: 'id_carrito',
    as: 'items',
  });
};

module.exports = Cart;
