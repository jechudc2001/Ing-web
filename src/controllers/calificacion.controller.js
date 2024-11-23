import Exam from '../models/exam.js';
import Pregunta from '../models/pregunta.js';
import Reglas from '../models/reglas.js'; 
import Simulation from '../models/simulation.js';
import SimulationResult from '../models/simulation_result.js';
import User from '../models/user.js';
import Alternativa from '../models/alternativa.js';
import Sequelize from 'sequelize';

export const calcularPuntaje = async (req, res) => {
    try {

    console.log("SADasdasdad");
      const { id_exam, respuestas, tiempoFinal } = req.body;
      const user = req.session.user;
    console.log(user)
    console.log(id_exam)
    console.log(respuestas)
      if (!user || !id_exam || !respuestas) {
        return res.status(400).json({ message: 'Datos incompletos.' });
      }
  
      // Obtener reglas de puntaje (primer registro de la tabla "reglas")
      const reglas = await Reglas.findOne();
      if (!reglas) {
        return res.status(500).json({ message: 'No se encontraron reglas de puntuación.' });
      }
  
      // Crear una simulación y obtener su ID
      const simulation = await Simulation.create({
        id_usuario: user.id,
        id_exam,
        fecha_realizacion: Sequelize.literal('NOW()'), // Fecha actual del servidor
        puntaje_total: 0 // Inicialmente 0, se actualizará después de calcular
      });
      
      const id_simulation = simulation.id_simulation;
  
      let puntajeTotal = 0;
  
      // Procesar respuestas y calcular el puntaje
      const resultados = await Promise.all(
        respuestas.map(async ({ idPregunta, idAlternativa }) => {
          const alternativa = await Alternativa.findOne({
            where: { id_alternativa: idAlternativa },
            attributes: ['es_correcta', 'id_pregunta']
          });
  
          let esCorrecta = 0;
          let puntaje = 0;
  
          if (alternativa) {
            esCorrecta = alternativa.es_correcta ? 1 : 0;
            puntaje = esCorrecta ? reglas.respuesta_correcta : reglas.respuesta_incorrecta;
          } else {
            // Alternativa no seleccionada (sin respuesta)
            puntaje = reglas.sin_respuesta;
          }
  
          // Acumular puntaje total
          puntajeTotal += puntaje;
  
          // Insertar en tabla "simulation_result"
          return {
            id_simulation,
            id_pregunta: idPregunta,
            respuesta_seleccionada: idAlternativa ? String.fromCharCode(65 + (idAlternativa % 5)) : null, // Ejemplo: A, B, C...
            es_correcta: esCorrecta,
            puntaje
          };
        })
      );
  
      // Insertar los resultados en "simulation_result"
      await SimulationResult.bulkCreate(resultados);
  
      // Actualizar el puntaje total en la simulación
      simulation.puntaje_total = puntajeTotal;
      await simulation.save();
  
      // Enviar respuesta
      return res.status(200).json({
        message: 'Simulación registrada con éxito.',
        simulation: {
          id_simulation,
          id_usuario: user.id_usuario,
          id_exam,
          puntaje_total: puntajeTotal,
          tiempoFinal,
          resultados
        }
      });
    } catch (error) {
      console.error('Error al calcular puntaje:', error);
      return res.status(500).json({ message: 'Error interno del servidor.', error });
    }
  };