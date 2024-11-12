import sequelize from './dbConfig.js';

import Alternativa from '../src/models/alternativa.js'; 
import User from '../src/models/user.js';
import Exam from '../src/models/exam.js';
import Question from '../src/models/pregunta.js';
import Canal from '../src/models/canal.js';
import ExamType from '../src/models/examType.js';
import Materia from '../src/models/materia.js';
import Simulation from '../src/models/simulation.js';
import SimulationResult from '../src/models/simulation_result.js';
import Reglas from '../src/models/reglas.js'; 


const syncDatabase = async () => {
  try {
    // Cambia 'force: true' por 'alter: true' para modificar la estructura sin perder datos
    await sequelize.sync({ alter: true, logging: console.log });
    console.log('Base de datos sincronizada con éxito');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDatabase();
