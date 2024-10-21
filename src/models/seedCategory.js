// src/seeders/seedCategory.js

//los datos de Category.js

const Category = require('../models/Category');
const { sequelize } = require('../config/db');

const seedCategories = async () => {
  try {
    await sequelize.sync({ alter: true });

    const categories = [
      { nombre: 'Dulces' },
      { nombre: 'Snacks' },
      { nombre: 'Comida' },
      { nombre: 'Bebidas' }
    ];

    for (const category of categories) {
      await Category.create(category);
    }

    console.log('Categorías agregadas correctamente.');
  } catch (error) {
    console.error('Error al agregar categorías:', error);
  } finally {
    await sequelize.close();
  }
};

seedCategories();
