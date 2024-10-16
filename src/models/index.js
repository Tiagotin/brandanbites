// src/models/index.js
//importar y sincronizar bd
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
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Relaciones entre Cart y Product (Many-to-Many a través de CartItem)
Cart.belongsToMany(Product, { through: CartItem, as: 'productos' });
Product.belongsToMany(Cart, { through: CartItem, as: 'carritos' });

// Relaciones entre User y Payment (One-to-Many)
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

// Relaciones entre Payment y Transaction (One-to-Many)
Payment.hasMany(Transaction, { foreignKey: 'paymentId' });
Transaction.belongsTo(Payment, { foreignKey: 'paymentId' });

// Relaciones entre User y Transaction (One-to-Many)
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Payment,
  Transaction,
};
