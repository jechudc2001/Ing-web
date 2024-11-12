import Canal from '../models/canal.js';

// Crear un nuevo canal
export const createCanal = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoCanal = await Canal.create({ nombre });
    res.status(201).json(nuevoCanal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los canales
export const getCanales = async (req, res) => {
  try {
    const canales = await Canal.findAll();
    res.status(200).json(canales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un canal por ID
export const getCanalById = async (req, res) => {
  try {
    const { id } = req.params;
    const canal = await Canal.findByPk(id);
    if (!canal) {
      return res.status(404).json({ message: 'Canal no encontrado' });
    }
    res.status(200).json(canal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un canal
export const updateCanal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const canal = await Canal.findByPk(id);
    if (!canal) {
      return res.status(404).json({ message: 'Canal no encontrado' });
    }
    canal.nombre = nombre;
    await canal.save();
    res.status(200).json(canal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un canal
export const deleteCanal = async (req, res) => {
  try {
    const { id } = req.params;
    const canal = await Canal.findByPk(id);
    if (!canal) {
      return res.status(404).json({ message: 'Canal no encontrado' });
    }
    await canal.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
