// src/models/CartItem.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CartItem extends Model {
  // Método para calcular el subtotal
  getSubtotal() {
    return this.cantidad * this.precio_unitario;
  }

  // Método para aumentar la cantidad
  aumentarCantidad(cantidad = 1) {
    this.cantidad += cantidad;
    return this.save();
  }

  // Método para disminuir la cantidad
  disminuirCantidad(cantidad = 1) {
    if (this.cantidad - cantidad < 1) {
      throw new Error('La cantidad no puede ser menor a 1');
    }
    this.cantidad -= cantidad;
    return this.save();
  }
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carritos', // Nombre de la tabla de carritos
      key: 'id', // Clave primaria en la tabla de carritos
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', // Nombre de la tabla de productos
      key: 'id', // Clave primaria en la tabla de productos
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CartItem',
  tableName: 'detalle_carritos',
  timestamps: true,
});

// Relación con Cart y Product
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Cart, {
    foreignKey: 'id_carrito',
    as: 'carrito',
  });
  CartItem.belongsTo(models.Product, {
    foreignKey: 'id_producto',
    as: 'producto',
  });
};

module.exports = CartItem;
