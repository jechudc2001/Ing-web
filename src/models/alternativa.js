import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Pregunta from './pregunta.js';

const Alternativa = sequelize.define('Alternativa', {
  id_alternativa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pregunta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pregunta,
      key: 'id_pregunta'
    }
  },
  texto: {
    type: DataTypes.STRING(450),
    allowNull: true
  },
  es_correcta: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'alternativa',
  timestamps: false
});


Alternativa.belongsTo(Pregunta, { foreignKey: 'id_pregunta' });
Pregunta.hasMany(Alternativa, { foreignKey: 'id_pregunta', as: 'alternativas' });


export default Alternativa;
