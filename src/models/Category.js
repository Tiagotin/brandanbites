// src/models/Category.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Category extends Model {
  static async findByName(name) {
    return await this.findOne({ where: { nombre: name } });
  }

  static async listAll() {
    return await this.findAll();
  }
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'El nombre de la categoría debe ser único.',
    },
    validate: {
      len: {
        args: [3, 50],
        msg: 'El nombre debe tener entre 3 y 50 caracteres.',
      },
    },
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categorias',
  timestamps: true,
});

// Relación con el modelo Product
Category.associate = (models) => {
  Category.hasMany(models.Product, {
    foreignKey: 'id_categoria',
    as: 'productos',
  });
};

module.exports = Category;
