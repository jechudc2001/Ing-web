import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import User from './user.js';
import Exam from './exam.js';

const Simulation = sequelize.define('Simulation', {
  id_simulation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_usuario'
    }
  },
  id_exam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exam,
      key: 'id_exam'
    }
  },
  fecha_realizacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  puntaje_total: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: true
},
  tipoSimulacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tiempo_simulacion: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'simulation',
  timestamps: false
});

export default Simulation;
