import Alternativa from '../models/alternativa.js';
import Pregunta from '../models/pregunta.js';

// Función para obtener todas las alternativas de una pregunta
export const getAlternativasByPregunta = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros

  try {
    // Buscar las alternativas asociadas a la pregunta
    const alternativas = await Alternativa.findAll({
      where: { id_pregunta: id },
    });

    if (alternativas.length === 0) {
      return res.status(404).json({ message: "No se encontraron alternativas para esta pregunta." });
    }

    res.status(200).json(alternativas); // Enviar las alternativas encontradas como respuesta
  } catch (error) {
    console.error("Error al obtener las alternativas:", error);
    res.status(500).json({ message: "Error al obtener las alternativas" });
  }
};

// Función para crear una nueva alternativa para una pregunta
export const createAlternativa = async (req, res) => {
  const { id_pregunta, texto, es_correcta } = req.body; // Obtener los datos de la nueva alternativa desde el cuerpo de la solicitud

  try {
    // Verificar si la pregunta existe
    const preguntaExistente = await Pregunta.findByPk(id_pregunta);
    if (!preguntaExistente) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    // Crear la nueva alternativa
    const nuevaAlternativa = await Alternativa.create({
      id_pregunta,
      texto,
      es_correcta,
    });

    res.status(201).json(nuevaAlternativa); // Enviar la alternativa creada como respuesta
  } catch (error) {
    console.error("Error al crear la alternativa:", error);
    res.status(500).json({ message: "Error al crear la alternativa" });
  }
};

// Función para eliminar una alternativa por su ID
export const deleteAlternativa = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la alternativa desde los parámetros

  try {
    // Buscar la alternativa por ID
    const alternativa = await Alternativa.findByPk(id);
    if (!alternativa) {
      return res.status(404).json({ message: "Alternativa no encontrada" });
    }

    // Eliminar la alternativa
    await alternativa.destroy();

    res.status(200).json({ message: "Alternativa eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la alternativa:", error);
    res.status(500).json({ message: "Error al eliminar la alternativa" });
  }
};
