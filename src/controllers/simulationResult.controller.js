import SimulationResult from '../models/simulation_result.js';
import Simulation from '../models/simulation.js';
import Pregunta from '../models/pregunta.js';

// Crear un nuevo resultado de simulación
export const createSimulationResult = async (req, res) => {
  try {
    const { id_simulation, id_pregunta, respuesta_seleccionada, es_correcta, puntaje } = req.body;
    const nuevoResultado = await SimulationResult.create({ id_simulation, id_pregunta, respuesta_seleccionada, es_correcta, puntaje });
    res.status(201).json(nuevoResultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los resultados de simulación
export const getSimulationResults = async (req, res) => {
  try {
    const results = await SimulationResult.findAll({
      include: [
        { model: Simulation, as: 'simulation' }, // Incluir información de la simulación
        { model: Pregunta, as: 'pregunta' } // Incluir información de la pregunta
      ]
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un resultado de simulación por ID
export const getSimulationResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SimulationResult.findByPk(id, {
      include: [
        { model: Simulation, as: 'simulation' }, // Incluir información de la simulación
        { model: Pregunta, as: 'pregunta' } // Incluir información de la pregunta
      ]
    });
    if (!result) {
      return res.status(404).json({ message: 'Resultado de simulación no encontrado' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un resultado de simulación
export const updateSimulationResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_simulation, id_pregunta, respuesta_seleccionada, es_correcta, puntaje } = req.body;
    const result = await SimulationResult.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: 'Resultado de simulación no encontrado' });
    }
    result.id_simulation = id_simulation;
    result.id_pregunta = id_pregunta;
    result.respuesta_seleccionada = respuesta_seleccionada;
    result.es_correcta = es_correcta;
    result.puntaje = puntaje;
    await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un resultado de simulación
export const deleteSimulationResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SimulationResult.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: 'Resultado de simulación no encontrado' });
    }
    await result.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
