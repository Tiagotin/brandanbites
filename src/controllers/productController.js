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

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: 'categorias', through: { attributes: [] } }],
    });
    if (!product) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoriaIds } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    product.nombre = nombre || product.nombre;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;
    product.stock = stock || product.stock;
    await product.save();

    if (categoriaIds && categoriaIds.length > 0) {
      const categorias = await Category.findAll({ where: { id: categoriaIds } });
      await product.setCategorias(categorias);
    }

    res.json(product);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    await product.destroy();
    res.json({ mensaje: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
