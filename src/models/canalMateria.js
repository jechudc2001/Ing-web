import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';
import Canal from './canal.js';
import Materia from './materia.js';


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





// Relación Many-to-Many con tabla intermedia
Canal.belongsToMany(Materia, { through: CanalMateria });


Materia.belongsToMany(Canal, { through: CanalMateria });


export default CanalMateria;
