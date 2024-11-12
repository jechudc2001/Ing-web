import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
const ExamType = sequelize.define('ExamType', {
  id_exam_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'exam_type',
  timestamps: false
});

export default ExamType;
