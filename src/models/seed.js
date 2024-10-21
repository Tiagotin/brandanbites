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
        password: 'LoKu2dns0F!',
        telefono: '11 3379-3285',
        rol: 'admin', // Asignar rol de administrador
      },
      {
        nombre: 'Tiago Guagliano',
        email: '46557799@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 6129-2269',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Lucía Miranda',
        email: '47307777@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 3656-2248',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Damian Perez',
        email: '47058200@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 5119-2369',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Santiago Benitez',
        email: '46991998@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 5814-4020',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Mauro Farias',
        email: '47156059@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 5919-1823',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Santiago Sosa',
        email: '47236674@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 2835-3181',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Gastón Paredes',
        email: '47027962@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 3775-0261',
        rol: 'admin', // Asignar rol de usuario normal
      },
      {
        nombre: 'Marsi Ferreira',
        email: '47414885@insi.edu.ar',
        password: 'LoKu2dns0F!',
        telefono: '11 2609-8649',
        rol: 'admin', // Asignar rol de usuario normal
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
