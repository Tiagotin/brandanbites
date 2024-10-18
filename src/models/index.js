// src/models/index.js
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Payment = require('./Payment');
const Transaction = require('./Transaction');

// Relaciones entre Product y Category (Many-to-Many)
Product.belongsToMany(Category, { through: 'ProductCategory', as: 'categorias' });
Category.belongsToMany(Product, { through: 'ProductCategory', as: 'productos' });

// Relaciones entre User y Cart (One-to-One)
User.hasOne(Cart, { foreignKey: 'id_usuario' }); // Cambié a 'id_usuario' para mantener la consistencia
Cart.belongsTo(User, { foreignKey: 'id_usuario' });

// Relaciones entre Cart y CartItem (One-to-Many)
Cart.hasMany(CartItem, { foreignKey: 'id_carrito', as: 'items' }); // Relación directa
CartItem.belongsTo(Cart, { foreignKey: 'id_carrito' }); // Relación inversa

// Relaciones entre Product y CartItem (One-to-Many)
Product.hasMany(CartItem, { foreignKey: 'id_producto', as: 'items' }); // Relación directa
CartItem.belongsTo(Product, { foreignKey: 'id_producto' }); // Relación inversa

// Relaciones entre User y Payment (One-to-Many)
User.hasMany(Payment, { foreignKey: 'id_usuario' }); // Cambié a 'id_usuario'
Payment.belongsTo(User, { foreignKey: 'id_usuario' });

// Relaciones entre Payment y Transaction (One-to-Many)
Payment.hasMany(Transaction, { foreignKey: 'id_pago' }); // Cambié a 'id_pago'
Transaction.belongsTo(Payment, { foreignKey: 'id_pago' });

// Relaciones entre User y Transaction (One-to-Many)
User.hasMany(Transaction, { foreignKey: 'id_usuario' }); // Cambié a 'id_usuario'
Transaction.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Payment,
  Transaction,
};
