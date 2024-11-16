import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Exam from './exam.js';
import Materia from './materia.js';

const Pregunta = sequelize.define('Pregunta', {
  id_pregunta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_exam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exam,
      key: 'id_exam'
    }
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Materia,
      key: 'id_materia'
    }
  },
  texto: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  img: {
    type: DataTypes.STRING(255), 
    allowNull: true
  }
}, {
  tableName: 'pregunta',
  timestamps: false
});


Pregunta.belongsTo(Exam, { foreignKey: 'id_exam' });
Exam.hasMany(Pregunta, { foreignKey: 'id_exam', as: 'preguntas' });


Pregunta.belongsTo(Materia, { foreignKey: 'id_materia' });
Materia.hasMany(Pregunta, { foreignKey: 'id_materia', as: 'preguntas' });

export default Pregunta;


