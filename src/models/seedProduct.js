// src/seeders/seedProduct.js

const Product = require('../models/Product');
const Category = require('../models/Category');
const { sequelize } = require('../config/db');

const seedProducts = async () => {
  try {
    await sequelize.sync({ alter: true });

    // Buscamos las categorías previamente creadas
    const dulcesCategory = await Category.findByName('Dulces');
    const snacksCategory = await Category.findByName('Snacks');
    const comidaCategory = await Category.findByName('Comida');
    const bebidasCategory = await Category.findByName('Bebidas');

    // Agregamos los productos
    const products = [
      // Productos de Dulces
      { nombre: 'Alka', descripcion: '4x$100', precio: 100, stock: 50, id_categoria: dulcesCategory.id },
      { nombre: 'Pico Dulce', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },
      { nombre: 'Rellenos Frutal', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },
      { nombre: 'Miel', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },
      { nombre: 'Menta Cristal', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },
      { nombre: 'Rodaja Craizy', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },
      { nombre: 'Gafitos Frutal', descripcion: '$50 C/U', precio: 50, stock: 100, id_categoria: dulcesCategory.id },

      // Productos de Snacks - Alfajores
      { nombre: 'Guaymallen', descripcion: '$300', precio: 300, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Jorgito', descripcion: '$800', precio: 800, stock: 30, id_categoria: snacksCategory.id },
      { nombre: 'Jorgelin', descripcion: '$900', precio: 900, stock: 25, id_categoria: snacksCategory.id },
      { nombre: 'Triguaymallen', descripcion: '$900', precio: 900, stock: 25, id_categoria: snacksCategory.id },
      { nombre: 'Aguila', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },
      { nombre: 'Black', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },
      { nombre: 'Blanco-negro', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },
      { nombre: 'Trishot', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },
      { nombre: 'Bon o bon', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },
      { nombre: 'Milka', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: snacksCategory.id },

      // Snacks - Galletitas
      { nombre: 'Koki Chips', descripcion: '$800', precio: 800, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Vocacion', descripcion: '$800', precio: 800, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Mini Todys', descripcion: '$800', precio: 800, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Obleas Oblitas', descripcion: '$500', precio: 500, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Mini Mantecadas', descripcion: '$900', precio: 900, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Suavesitas', descripcion: '$900', precio: 900, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Pitusas', descripcion: '$900', precio: 900, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Coronitas', descripcion: '$900', precio: 900, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Pepas Tompin', descripcion: '$800', precio: 800, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Fauna', descripcion: '$700', precio: 700, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Celosas', descripcion: '$700', precio: 700, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Mana Rellena', descripcion: '$1200', precio: 1200, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Galletitas Block', descripcion: '$1200', precio: 1200, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Rocklets', descripcion: '$1200', precio: 1200, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Mini Chips', descripcion: '$900', precio: 900, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Resitos', descripcion: '$1000', precio: 1000, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Rey', descripcion: '$1000', precio: 1000, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Rueditas Pep', descripcion: '$800', precio: 800, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Papas Fritas Slices', descripcion: '$1000', precio: 1000, stock: 50, id_categoria: snacksCategory.id },
      { nombre: 'Saladix', descripcion: '$600', precio: 600, stock: 50, id_categoria: snacksCategory.id },

      // Productos de Comida
      { nombre: 'Empanadas', descripcion: '$800', precio: 800, stock: 30, id_categoria: comidaCategory.id },
      { nombre: 'Panchos', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Pebetes', descripcion: '$1000', precio: 1000, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Hamburguesa Simple', descripcion: '$1200', precio: 1200, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Hamburguesa Jamon y Queso', descripcion: '$1500', precio: 1500, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Hamburguesa Lechuga y Tomate', descripcion: '$1500', precio: 1500, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Hamburguesa Completa', descripcion: '$1800', precio: 1800, stock: 20, id_categoria: comidaCategory.id },
      { nombre: 'Sandwich Milanesa Simple', descripcion: '$2000', precio: 2000, stock: 15, id_categoria: comidaCategory.id },
      { nombre: 'Sandwich Milanesa Jamon y Queso', descripcion: '$2300', precio: 2300, stock: 15, id_categoria: comidaCategory.id },
      { nombre: 'Sandwich Milanesa Lechuga y Tomate', descripcion: '$2300', precio: 2300, stock: 15, id_categoria: comidaCategory.id },
      { nombre: 'Sandwich Milanesa Completa', descripcion: '$2500', precio: 2500, stock: 15, id_categoria: comidaCategory.id },

      // Productos de Bebidas
      // Productos de Bebidas
      { nombre: 'Placer 500 ml', descripcion: '$600', precio: 600, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Baggio 200 ml', descripcion: '$600', precio: 600, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Manaos 600 ml', descripcion: '$800', precio: 800, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Agua Mineral', descripcion: '$500', precio: 500, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Baggio 1 L', descripcion: '$200', precio: 200, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Manaos 2.25 L', descripcion: '$1400', precio: 1400, stock: 50, id_categoria: bebidasCategory.id },
      { nombre: 'Placer 1.5 L', descripcion: '$1200', precio: 1200, stock: 50, id_categoria: bebidasCategory },
    ];

    for (const product of products) {
        await Product.create(product);
      }
  
      console.log('Productos agregados correctamente.');
    } catch (error) {
      console.error('Error al agregar productos:', error);
    } finally {
      await sequelize.close();
    }
  };
  
  seedProducts();
  
