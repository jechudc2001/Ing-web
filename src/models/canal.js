import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const Canal = sequelize.define('Canal', {
  id_canal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'canal',
  timestamps: false
});




export default Canal;
