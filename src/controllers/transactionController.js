// src/controllers/transactionController.js
const { Transaction } = require('../models'); // Asegúrate de que la ruta sea correcta

// Obtener todas las transacciones del usuario
exports.getUserTransactions = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está en req.user después de verificar el token
  try {
    const transactions = await Transaction.findAll({
      where: { id_usuario: userId }, // Usar el campo 'id_usuario' para la consulta
    });

    if (transactions.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron transacciones para este usuario.' });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error al obtener las transacciones del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener las transacciones', error });
  }
};

// Obtener una transacción específica por ID
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id, {
      include: [User, Payment], // Incluye los modelos relacionados si es necesario
    });

    if (!transaction) {
      return res.status(404).json({ mensaje: 'Transacción no encontrada' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error al obtener la transacción:', error);
    res.status(500).json({ mensaje: 'Error al obtener la transacción', error });
  }
};
