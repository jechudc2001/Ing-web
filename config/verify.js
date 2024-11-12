import sequelize from './dbConfig.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  })
  .finally(() => {
    sequelize.close(); // Cierra la conexión después de la prueba
  });
