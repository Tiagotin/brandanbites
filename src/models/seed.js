//datos de User.js

// seed.js
const { User } = require('./src/models'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcrypt');

async function insertUsers() {
  try {
    const users = [
      {
        nombre: 'Santino Moraes',
        email: '47216695@insi.edu.ar',
        contraseña: 'esmg1234',
        telefono: '11 3379-3285',
      },
      {
        nombre: 'Tiago Guagliano',
        email: '46557799@insi.edu.ar',
        contraseña: 'Septimo7v',
        telefono: '11 7894-5612',
      },
    ];

    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(user.contraseña, salt);
      const usuarioCreado = await User.create(user);
      console.log('Usuario creado con éxito:', usuarioCreado);
    }
  } catch (error) {
    console.error('Error al crear los usuarios:', error);
  }
}

insertUsers();

