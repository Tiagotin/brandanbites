// src/models/seed.js
const { sequelize } = require('../config/db'); // Importa la instancia de Sequelize
const { User } = require('./index'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');

async function insertUsers() {
  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ force: true }); // Usa { force: true } solo en desarrollo

    const users = [
      {
        nombre: 'Santino Moraes',
        email: '47216695@insi.edu.ar',
        password: 'esmg1234',
        telefono: '11 3379-3285',
        rol: 'admin', // Asignar rol de administrador
      },
      {
        nombre: 'Tiago Guagliano',
        email: '46557799@insi.edu.ar',
        password: 'Septimo7v',
        telefono: '11 7894-5612',
        rol: 'usuario', // Asignar rol de usuario normal
      },
    ];

    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const usuarioCreado = await User.create(user);
      console.log('Usuario creado con éxito:', usuarioCreado);
    }
  } catch (error) {
    console.error('Error al crear los usuarios:', error);
  }
}

insertUsers();
