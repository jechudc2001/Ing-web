import Pregunta from '../models/pregunta.js';
import Alternativa from '../models/alternativa.js';
import Exam from '../models/exam.js';
import Materia from '../models/materia.js';



export const createPregunta = async (req, res) => {
  try {
    const { id_exam, id_materia, texto, alternativas } = req.body;
    const imgPath = req.file ? req.file.filename : null; // Obtén la ruta de la imagen cargada

    console.log(imgPath)
    

    // Crear la pregunta con el nombre de la imagen
    const nuevaPregunta = await Pregunta.create({ id_exam, id_materia, texto, img: imgPath });


    // Crear las alternativas asociadas a la pregunta
    if (alternativas && alternativas.length > 0) {
      const alternativasData = alternativas.map(alt => ({
        id_pregunta: nuevaPregunta.id_pregunta,
        texto: alt.texto,
        es_correcta: alt.es_correcta
      }));
      await Alternativa.bulkCreate(alternativasData);
    }

    // Recuperar la pregunta con sus alternativas
    const preguntaConAlternativas = await Pregunta.findOne({
      where: { id_pregunta: nuevaPregunta.id_pregunta },
      include: [
        {
          model: Alternativa,
          as: 'alternativas', // El alias correcto
          required: false
        }
      ]
    });

    res.status(201).json({ message: 'Pregunta y alternativas creadas exitosamente', pregunta: preguntaConAlternativas });
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ message: error.message });
  }
};



export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll({
      include: [
        { model: Alternativa }, // Incluir alternativas asociadas
        { model: Exam, as: 'exam' }, // Incluir información del examen
        { model: Materia, as: 'materia' } // Incluir información de la materia
      ]
    });
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPreguntaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await Pregunta.findByPk(id, {
      include: [
        { model: Alternativa }, // Incluir alternativas asociadas
        { model: Exam, as: 'exam' },
        { model: Materia, as: 'materia' }
      ]
    });
    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.status(200).json(pregunta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_exam, id_materia, texto, alternativas } = req.body;
    const imgPath = req.file ? req.file.filename : null;

    console.log('Datos recibidos:', req.body);
    console.log('id_exam:', id_exam, 'id_materia:', id_materia, 'texto:', texto, 'imgPath:', imgPath, 'alternativas:', alternativas);

    // Buscar la pregunta por ID
    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    // Actualizar la pregunta con los nuevos datos
    await pregunta.update({
      id_exam,
      id_materia,
      texto,
      img: imgPath || pregunta.img // Si no hay nueva imagen, conservar la existente
    });

    // Eliminar las alternativas existentes
    await Alternativa.destroy({ where: { id_pregunta: id } });

    // Crear las nuevas alternativas
    if (alternativas && alternativas.length > 0) {
      const alternativasData = alternativas.map(alt => ({
        id_pregunta: id,
        texto: alt.texto,
        es_correcta: alt.es_correcta
      }));

      await Alternativa.bulkCreate(alternativasData);
    }

    // Recuperar la pregunta con sus alternativas actualizadas
    const preguntaConAlternativas = await Pregunta.findOne({
      where: { id_pregunta: pregunta.id_pregunta },
      include: [
        {
          model: Alternativa,
          as: 'alternativas',
          required: false
        }
      ]
    });

    res.status(200).json({
      message: 'Pregunta y alternativas actualizadas correctamente',
      pregunta: preguntaConAlternativas
    });
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ message: error.message });
  }
};






export const deletePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    // Eliminar las alternativas asociadas a la pregunta
    await Alternativa.destroy({ where: { id_pregunta: id } });

    // Eliminar la pregunta
    await pregunta.destroy();
    res.status(204).send(); // No content, porque la eliminación fue exitosa
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
