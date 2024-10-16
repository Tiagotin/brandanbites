// src/config/mercadoPago.js
const mercadopago = require('mercadopago');
require('dotenv').config();

// Configura tus credenciales de Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

module.exports = mercadopago;
