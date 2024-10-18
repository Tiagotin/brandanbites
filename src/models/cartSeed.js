// src/models/cartSeed.js
const { Cart } = require('./index'); // Asegúrate de que la ruta sea correcta
const { User } = require('./User'); // Importa el modelo de Usuario

const cartSeed = async () => {
  try {
    // Asegúrate de que hay usuarios en la base de datos para asociar con los carritos
    const users = await User.findAll();
    
    if (users.length === 0) {
      console.error('No hay usuarios en la base de datos para asociar carritos.');
      return;
    }

    // Crear carritos de ejemplo
    const carts = [
      {
        id_usuario: users[0].id, // Asocia el carrito al primer usuario
        estado: 'activo',
      },
      {
        id_usuario: users[1].id, // Asocia el carrito al segundo usuario
        estado: 'finalizado',
      },
      {
        id_usuario: users[0].id, // Asocia otro carrito al primer usuario
        estado: 'cancelado',
      },
    ];

    // Inserta los carritos en la base de datos
    for (const cart of carts) {
      await Cart.create(cart);
    }

    console.log('Carritos creados exitosamente.');
  } catch (error) {
    console.error('Error al crear carritos:', error);
  }
};

module.exports = cartSeed;
