import User from '../models/user.js';
import bcrypt from 'bcryptjs';  // Asegúrate de importar bcrypt

export const createUser = async (req, res) => {
  try {
    const { nombre_completo, password, email, user_type } = req.body;

    // Hasheamos la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);  // Generamos el salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hasheamos la contraseña

    // Ahora creamos el usuario con la contraseña hasheada
    const nuevoUser = await User.create({
      nombre_completo,
      password: hashedPassword,  // Usamos la contraseña hasheada
      email,
      user_type
    });

    // Respondemos con el nuevo usuario creado
    res.status(201).json(nuevoUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, password, email, user_type } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.nombre_completo = nombre_completo;
    user.password = password;
    user.email = email;
    user.user_type = user_type;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
