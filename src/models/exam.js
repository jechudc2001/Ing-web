import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Canal from './canal.js';
import ExamType from './examType.js';

const Exam = sequelize.define('Exam', {
  id_exam: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  canal: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Canal,
      key: 'id_canal'
    }
  },
  exam_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ExamType,
      key: 'id_exam_type'
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'exam',
  timestamps: false
});



export default Exam;
