import express from "express";
import path from "path"; // Para manejar rutas de archivos
import { fileURLToPath } from "url";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

const app = express();

// Obtener __dirname en módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración para EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Carpeta de vistas
app.use(express.static(path.join(__dirname, "public")));

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Crear el cliente Redis
const RedisStore = connectRedis(session);  // Correctly use the RedisStore constructor
const redisClient = redis.createClient({
  host: 'localhost',  // Cambiar si el servidor Redis está en otro lugar
  port: 6379,         // Puerto de Redis
  legacyMode: true    // Permite usar el modo heredado si es necesario
});

redisClient.connect().catch(console.error);

// Configuración de sesión con Redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "clave123xdgaea", // Cambia esto por una clave más robusta
    resave: false, // No guardar la sesión si no se modifica
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora en milisegundos
      httpOnly: true, // Seguridad: solo accesible por HTTP
    },
  })
);

// Rutas
app.use(authRoutes);
app.use('/alternativas', alternativaRoute);
app.use('/canales', canalRoute);
app.use('/exams', examRoute);
app.use('/exam-types', examTypeRoute);
app.use('/materias', materiaRoute);
app.use('/preguntas', preguntaRoute);
app.use('/reglas', reglaRoute);
app.use('/simulations', simulationRoute);
app.use('/simulation-results', simulationRestultRoute);
app.use('/users', userRoute);
app.use(renderAdminRoute);
app.use(renderUserRoute);
app.use('/canal-materias',canalMateriaRoutes);
app.use(calificacion);
app.use(vistasYprocedimientos);

// Inicia el servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
