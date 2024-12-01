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


// Actualizar un usuario (excepto user_type y password)
export const updateUserBasic = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar solo los campos permitidos
    if (nombre_completo) user.nombre_completo = nombre_completo;
    if (email) user.email = email;

    await user.save();

     
    if (req.session.user && req.session.user.id === parseInt(id)) {
      req.session.user.username = nombre_completo || req.session.user.nombre_completo;
      req.session.user.email = email || req.session.user.email;
    }

    console.log(req.session.user);
    console.log(nombre_completo);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar solo la contraseña de un usuario
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'La contraseña es requerida' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un nuevo hash para la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Actualizar solo la contraseña
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
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
