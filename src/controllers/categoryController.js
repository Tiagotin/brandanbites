// src/controllers/categoryController.js
const { Category } = require('../models');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newCategory = await Category.create({ nombre });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    category.nombre = nombre || category.nombre;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await category.destroy();
    res.json({ mensaje: 'Categoría eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
