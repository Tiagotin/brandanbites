// importacion de modulos
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'development' ? ':memory:' : './database.sqlite', // Aquí se guarda el archivo de la base de datos
  logging: false, // Desactiva el logging de SQL
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos SQLite establecida correctamente.');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

