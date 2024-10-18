// src/controllers/cartController.js
const { Cart, User, Product } = require('../models'); // Asegúrate de que las rutas sean correctas

// Obtener el carrito del usuario
const getCart = async (req, res) => {
  const userId = req.user.id; // Obtiene el ID del usuario del token
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product, as: 'products' }] // Incluye los productos en el carrito
    });
    
    if (!cart) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ mensaje: 'Error al obtener el carrito' });
  }
};

// Agregar un producto al carrito
const addToCart = async (req, res) => {
  const userId = req.user.id; // Obtiene el ID del usuario del token
  const { productId, quantity } = req.body; // Asume que se envía el ID del producto y la cantidad

  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      // Si no hay carrito, lo creamos
      const newCart = await Cart.create({ userId });
      await newCart.addProduct(productId, { through: { quantity } });
      return res.status(201).json(newCart);
    }

    // Agregar el producto al carrito existente
    const [cartItem, created] = await cart.getProducts({ where: { id: productId } });

    if (created) {
      await cart.addProduct(productId, { through: { quantity } });
    } else {
      // Si el producto ya existe, actualizamos la cantidad
      cartItem.CartItem.quantity += quantity; // Asegúrate de que el modelo del CartItem tiene este campo
      await cartItem.CartItem.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ mensaje: 'Error al agregar producto al carrito' });
  }
};

// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
  const userId = req.user.id; // Obtiene el ID del usuario del token
  const { itemId } = req.params; // Obtiene el ID del producto a eliminar

  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    await cart.removeProduct(itemId); // Asegúrate de que esto esté correcto según tu modelo
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ mensaje: 'Error al eliminar producto del carrito' });
  }
};

// Vaciar el carrito
const clearCart = async (req, res) => {
  const userId = req.user.id; // Obtiene el ID del usuario del token

  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    await cart.setProducts([]); // Vacia el carrito
    res.json({ mensaje: 'Carrito vaciado' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ mensaje: 'Error al vaciar el carrito' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
