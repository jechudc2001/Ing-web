import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Simulation from './simulation.js';
import Pregunta from './pregunta.js';
import User from './user.js';

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
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_usuario'
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
    allowNull: true
  },
  es_correcta: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  puntaje: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'simulation_result',
  timestamps: false
});




SimulationResult.belongsTo(Pregunta, { foreignKey: 'id_pregunta' });
Pregunta.hasMany(SimulationResult, { foreignKey: 'id_pregunta'});


SimulationResult.belongsTo(Simulation, { foreignKey: 'id_simulation' });
Simulation.hasMany(SimulationResult, { foreignKey: 'id_simulation'});

SimulationResult.belongsTo(User, { foreignKey: 'id_usuario' });
User.hasMany(SimulationResult, { foreignKey: 'id_usuario'});

export default SimulationResult;
