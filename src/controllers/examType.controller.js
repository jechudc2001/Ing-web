import ExamType from '../models/examType.js';

// Crear un nuevo tipo de examen
export const createExamType = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoExamType = await ExamType.create({ nombre });
    res.status(201).json(nuevoExamType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los tipos de examen
export const getExamTypes = async (req, res) => {
  try {
    const examTypes = await ExamType.findAll();
    res.status(200).json(examTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un tipo de examen por ID
export const getExamTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const examType = await ExamType.findByPk(id);
    if (!examType) {
      return res.status(404).json({ message: 'Tipo de examen no encontrado' });
    }
    res.status(200).json(examType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un tipo de examen
export const updateExamType = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const examType = await ExamType.findByPk(id);
    if (!examType) {
      return res.status(404).json({ message: 'Tipo de examen no encontrado' });
    }
    examType.nombre = nombre;
    await examType.save();
    res.status(200).json(examType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un tipo de examen
export const deleteExamType = async (req, res) => {
  try {
    const { id } = req.params;
    const examType = await ExamType.findByPk(id);
    if (!examType) {
      return res.status(404).json({ message: 'Tipo de examen no encontrado' });
    }
    await examType.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
