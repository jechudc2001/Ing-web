import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';


import Materia from './materia.js';
import Canal from './canal.js';

const CanalMateria = sequelize.define('CanalMaterias', {
  
  cantidadPreguntas: {
    type: DataTypes.INTEGER, // Tipo entero
    allowNull: false, // Establecer si es obligatorio o no
    defaultValue: 0, // Valor predeterminado, si lo deseas
  }
}, {
  tableName: 'canalMateria', // Cambia esto si el nombre de tu tabla es diferente
  timestamps: false,
});



Canal.belongsToMany(Materia, {
  through: CanalMateria,
  foreignKey: 'CanalIdCanal', // Clave foránea en la tabla intermedia que apunta a Canal
  otherKey: 'MateriumIdMateria', // Clave foránea que apunta a Materia
});

Materia.belongsToMany(Canal, {
  through: CanalMateria,
  foreignKey: 'MateriumIdMateria', // Clave foránea en la tabla intermedia que apunta a Materia
  otherKey: 'CanalIdCanal', // Clave foránea que apunta a Canal
});



export default CanalMateria;
