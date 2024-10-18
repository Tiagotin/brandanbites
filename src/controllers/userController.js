const { User } = require('../models');

// Obtener perfil del usuario
const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener perfil del usuario' });
  }
};

// Actualizar perfil del usuario
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { nombre, email, telefono } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    user.telefono = telefono || user.telefono;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error al actualizar perfil del usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar perfil del usuario' });
  }
};

// Eliminar cuenta de usuario
const deleteUser = async (req, res) => {
  const { id } = req.params; // El ID debe ser el del usuario a eliminar

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

module.exports = { getProfile, updateProfile, deleteUser };
