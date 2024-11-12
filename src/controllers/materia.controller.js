import Materia from '../models/materia.js';

// Crear una nueva materia
export const createMateria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaMateria = await Materia.create({ nombre });
    res.status(201).json(nuevaMateria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las materias
export const getMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.status(200).json(materias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una materia por ID
export const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una materia
export const updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    materia.nombre = nombre;
    await materia.save();
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una materia
export const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    await materia.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
