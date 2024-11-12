import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASS,      // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Host de la base de datos
    port: process.env.DB_PORT, // Puerto de la base de datos
    dialect: 'mysql',          // Tipo de base de datos
  }
);

export default sequelize;
