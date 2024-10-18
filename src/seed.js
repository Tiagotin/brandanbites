// seed.js
const cartSeed = require('./src/models/cartSeed');
const { connectDB } = require('./src/config/db');

const runSeed = async () => {
  await connectDB(); // Conectar a la base de datos
  await cartSeed();  // Ejecutar la seed
};

runSeed().catch(error => console.error('Error en la ejecución de la seed:', error));
