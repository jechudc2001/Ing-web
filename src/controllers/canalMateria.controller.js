import CanalMateria from '../models/canalMateria.js';
import Canal from '../models/canal.js';
import Materia from '../models/materia.js';

// Crear una nueva relación Canal-Materia
export const crearCanalMateria = async (req, res) => {
  try {
    const { id_canal, id_materia, cantidadPreguntas } = req.body;

    // Verificar si la relación ya existe
    const existeRelacion = await CanalMateria.findOne({
      where: { id_canal, id_materia }
    });

    if (existeRelacion) {
      return res.status(400).json({ message: 'La relación Canal-Materia ya existe' });
    }

    // Crear una nueva entrada en la tabla CanalMateria
    const canalMateria = await CanalMateria.create({
      id_canal,
      id_materia,
      cantidadPreguntas,
    });

    res.status(201).json({ message: 'Relación Canal-Materia creada', canalMateria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la relación', error });
  }
};

// Obtener todas las relaciones Canal-Materia
export const obtenerCanalMaterias = async (req, res) => {
  try {
    const canalMaterias = await CanalMateria.findAll({
      include: [
        { model: Canal, attributes: ['id', 'nombre'] },
        { model: Materia, attributes: ['id', 'nombre'] }
      ]
    });

    res.status(200).json(canalMaterias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las relaciones', error });
  }
};


export const obtenerCanalMateriasArray = async (req, res) => {
  try {
    const canalMaterias = await CanalMateria.findAll({
      include: [
        { model: Canal, attributes: ['id', 'nombre'] },
        { model: Materia, attributes: ['id', 'nombre'] }
      ]
    });

    return canalMaterias;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las relaciones', error });
  }
};


// Obtener una relación Canal-Materia por sus IDs
export const obtenerCanalMateriaPorIds = async (req, res) => {
  try {
    const { id_canal, id_materia } = req.params;

    const canalMateria = await CanalMateria.findOne({
      where: { id_canal, id_materia },
      include: [
        { model: Canal, attributes: ['id', 'nombre'] },
        { model: Materia, attributes: ['id', 'nombre'] }
      ]
    });

    if (!canalMateria) {
      return res.status(404).json({ message: 'Relación Canal-Materia no encontrada' });
    }

    res.status(200).json(canalMateria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la relación', error });
  }
};

// Actualizar una relación Canal-Materia
export const actualizarCanalMateria = async (req, res) => {
  try {
    const { id_canal, id_materia } = req.params;
    const { cantidadPreguntas } = req.body;

    const canalMateria = await CanalMateria.findOne({
      where: { id_canal, id_materia }
    });

    if (!canalMateria) {
      return res.status(404).json({ message: 'Relación Canal-Materia no encontrada' });
    }

    canalMateria.cantidadPreguntas = cantidadPreguntas;
    await canalMateria.save();

    res.status(200).json({ message: 'Relación Canal-Materia actualizada', canalMateria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la relación', error });
  }
};

// Eliminar una relación Canal-Materia
export const eliminarCanalMateria = async (req, res) => {
  try {
    const { id_canal, id_materia } = req.params;

    const canalMateria = await CanalMateria.findOne({
      where: { id_canal, id_materia }
    });

    if (!canalMateria) {
      return res.status(404).json({ message: 'Relación Canal-Materia no encontrada' });
    }

    await canalMateria.destroy();
    res.status(200).json({ message: 'Relación Canal-Materia eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la relación', error });
  }
};
