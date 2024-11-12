import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Simulation from './simulation.js';
import Pregunta from './pregunta.js';

const SimulationResult = sequelize.define('SimulationResult', {
  id_simulation_result: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_simulation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Simulation,
      key: 'id_simulation'
    }
  },
  id_pregunta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pregunta,
      key: 'id_pregunta'
    }
  },
  respuesta_seleccionada: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  es_correcta: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  puntaje: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'simulation_result',
  timestamps: false
});

export default SimulationResult;
