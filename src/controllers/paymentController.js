// src/controllers/paymentController.js
const mercadopago = require('../config/mercadoPago');
const { Cart, CartItem, Product, Payment, Transaction } = require('../models');
const generateTicket = require('../utils/generateTicket');

exports.createPayment = async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener el carrito del usuario
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product, as: 'productos', through: { attributes: ['cantidad'] } }],
    });

    if (!cart || cart.productos.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío.' });
    }

    // Calcular el total
    let total = 0;
    cart.productos.forEach(product => {
      total += parseFloat(product.precio) * product.CartItem.cantidad;
    });

    // Crear preferencia para Mercado Pago
    const preference = {
      items: cart.productos.map(product => ({
        title: product.nombre,
        unit_price: parseFloat(product.precio),
        quantity: product.CartItem.cantidad,
      })),
      back_urls: {
        success: 'https://tu-dominio.com/success',
        failure: 'https://tu-dominio.com/failure',
        pending: 'https://tu-dominio.com/pending',
      },
      auto_return: 'approved',
      notification_url: 'https://tu-dominio.com/notifications',
    };

    const response = await mercadopago.preferences.create(preference);

    // Guardar el pago en la base de datos
    const payment = await Payment.create({
      userId,
      total,
      paymentUrl: response.body.init_point,
      status: 'pending',
    });

    res.json({ paymentUrl: response.body.init_point });
  } catch (error) {
    console.error('Error al crear pago:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};



/*---------------------
-----Notificaciones-----
-----------------------*/
// src/controllers/paymentController.js
exports.handleNotification = async (req, res) => {
    const { topic, id } = req.body;
  
    if (topic === 'payment') {
      try {
        const payment = await mercadopago.payment.findById(id);
        const paymentData = payment.body;
  
        // Actualizar el estado del pago en la base de datos
        const existingPayment = await Payment.findOne({ where: { id: paymentData.id } });
        if (existingPayment) {
          existingPayment.status = paymentData.status;
          await existingPayment.save();
  
          // Registrar la transacción
          await Transaction.create({
            userId: existingPayment.userId,
            paymentId: existingPayment.id,
            status: paymentData.status,
            amount: paymentData.transaction_amount,
          });
  
          // Si el pago fue aprobado, generar un ticket
          if (paymentData.status === 'approved') {
            const ticketCode = generateTicket(5); // Genera un código de 5 dígitos
            // Guardar el ticket en la base de datos o enviarlo al usuario
            // ...
          }
        }
  
        res.status(200).send('Notificación procesada');
      } catch (error) {
        console.error('Error al manejar notificación:', error);
        res.status(500).send('Error en el servidor');
      }
    } else {
      res.status(400).send('Tipo de notificación no soportado');
    }
  };
  