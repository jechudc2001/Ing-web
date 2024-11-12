import { DataTypes } from "sequelize";
import sequelize from '../../config/dbConfig.js';

const Reglas = sequelize.define("Reglas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    respuesta_correcta: {
        type: DataTypes.DOUBLE,  
        allowNull: false,
    },
    respuesta_incorrecta: {
        type: DataTypes.DOUBLE,  
        allowNull: false,
    },
    sin_respuesta: {
        type: DataTypes.DOUBLE,  
        defaultValue: 0.0,
    },
    puntaje_maximo: {
        type: DataTypes.DOUBLE,   
        allowNull: false,
    },
    tiempo_examen_simulacro: {
        type: DataTypes.DOUBLE,   
        allowNull: false,
    },
});

export default Reglas;
