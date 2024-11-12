import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const Materia = sequelize.define('Materia', {
  id_materia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'materia',
  timestamps: false
});

export default Materia;
