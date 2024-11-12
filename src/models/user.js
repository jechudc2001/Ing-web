import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  user_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'user',
  timestamps: false
});

export default User;
