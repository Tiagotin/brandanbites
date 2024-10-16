// importacion de modulos
const { Sequelize } = require('sequelize');
require('dotenv').config(); //.config lee el .env


//instancia sequelize para sacar configuraciones del .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // 'postgres' o 'mysql'
  logging: false, // Desactiva el logging de SQL
});


//funciona para conectar base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ alter: true }); // Usa { force: true } para resetear tablas (¡Cuidado!)
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Termina la aplicación
  }
};

module.exports = { sequelize, connectDB };
