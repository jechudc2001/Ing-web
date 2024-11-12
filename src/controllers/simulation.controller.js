import Simulation from '../models/simulation.js';
import User from '../models/user.js';
import Exam from '../models/exam.js';

// Crear una nueva simulación
export const createSimulation = async (req, res) => {
  try {
    const { id_usuario, id_exam, fecha_realizacion, puntaje_total } = req.body;
    const nuevaSimulation = await Simulation.create({ id_usuario, id_exam, fecha_realizacion, puntaje_total });
    res.status(201).json(nuevaSimulation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las simulaciones
export const getSimulations = async (req, res) => {
  try {
    const simulations = await Simulation.findAll({
      include: [
        { model: User, as: 'user' }, // Incluir información del usuario
        { model: Exam, as: 'exam' } // Incluir información del examen
      ]
    });
    res.status(200).json(simulations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una simulación por ID
export const getSimulationById = async (req, res) => {
  try {
    const { id } = req.params;
    const simulation = await Simulation.findByPk(id, {
      include: [
        { model: User, as: 'user' }, // Incluir información del usuario
        { model: Exam, as: 'exam' } // Incluir información del examen
      ]
    });
    if (!simulation) {
      return res.status(404).json({ message: 'Simulación no encontrada' });
    }
    res.status(200).json(simulation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una simulación
export const updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, id_exam, fecha_realizacion, puntaje_total } = req.body;
    const simulation = await Simulation.findByPk(id);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulación no encontrada' });
    }
    simulation.id_usuario = id_usuario;
    simulation.id_exam = id_exam;
    simulation.fecha_realizacion = fecha_realizacion;
    simulation.puntaje_total = puntaje_total;
    await simulation.save();
    res.status(200).json(simulation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una simulación
export const deleteSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const simulation = await Simulation.findByPk(id);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulación no encontrada' });
    }
    await simulation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
