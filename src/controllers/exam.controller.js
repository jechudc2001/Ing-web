import Exam from '../models/exam.js';
import Canal from '../models/canal.js';
import ExamType from '../models/examType.js';

// Crear un nuevo examen
export const createExam = async (req, res) => {
  try {
    const { canal, exam_type, year } = req.body;

    // Crear el examen
    const nuevoExam = await Exam.create({ canal, exam_type, year });
    console.log(nuevoExam);
    // Responder con un mensaje y la ID del examen creado
    res.status(201).json({ 
      message: 'Examen creado con éxito', 
      id: nuevoExam.id_exam
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el examen:', error);
    res.status(500).json({ message: 'Error al crear el examen' });
  }
};

// Obtener todos los exámenes
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un examen por ID
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id, {
      include: [
        { model: Canal, as: 'canal' }, // Incluir información del canal
        { model: ExamType, as: 'exam_type' } // Incluir información del tipo de examen
      ]
    });
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un examen
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { canal, exam_type, year } = req.body;
    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    exam.canal = canal;
    exam.exam_type = exam_type;
    exam.year = year;
    await exam.save();
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un examen
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    await exam.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
