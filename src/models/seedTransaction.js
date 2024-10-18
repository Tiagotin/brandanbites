//datos de Transaction.js

// seed.js
const { User, Payment, Transaction } = require('./src/models'); // Asegúrate de que la ruta sea correcta

async function insertTransactions() {
  try {
    // Supongamos que ya tienes usuarios y pagos creados
    const usuario = await User.findOne({ where: { email: 'maria.lopez@insi.edu.ar' } });
    const pago = await Payment.findOne({ where: { id_usuario: usuario.id } });

    // Crear la transacción
    const nuevaTransaccion = {
      ticketCode: 'TICKET123',
      status: 'completado',
      amount: 150.00, // Este monto debe corresponder con el pago
      id_usuario: usuario.id,
      id_pago: pago.id,
    };

    const transaccionCreada = await Transaction.create(nuevaTransaccion);
    console.log('Transacción creada con éxito:', transaccionCreada);
  } catch (error) {
    console.error('Error al crear la transacción:', error);
  }
}

// Llamar a las funciones de inserción
insertTransactions();
