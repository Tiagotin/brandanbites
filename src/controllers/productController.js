// src/controllers/productController.js
const { Product, Category } = require('../models');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'categorias', through: { attributes: [] } }],
    });
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoriaIds } = req.body;

  try {
    const product = await Product.create({ nombre, descripcion, precio, stock });

    if (categoriaIds && categoriaIds.length > 0) {
      const categorias = await Category.findAll({ where: { id: categoriaIds } });
      await product.addCategorias(categorias);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Otros métodos (actualizar, eliminar, obtener por ID) se definen de manera similar
