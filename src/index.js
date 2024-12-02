import express from "express";
import path from "path"; // Para manejar rutas de archivos
import { fileURLToPath } from "url";
import session from "express-session";


// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import alternativaRoute from "./routes/alternativa.routes.js";
import canalRoute from "./routes/canal.routes.js";
import examRoute from "./routes/exam.routes.js";
import examTypeRoute from "./routes/examType.routes.js";
import materiaRoute from "./routes/materia.routes.js";
import preguntaRoute from "./routes/pregunta.routes.js";
import reglaRoute from "./routes/regla.routes.js";
import renderAdminRoute  from "./routes/renderAdmin.routes.js";
import renderUserRoute from "./routes/renderUser.routes.js";
import simulationRoute from "./routes/simulation.routes.js";
import simulationRestultRoute from "./routes/simulationResult.routes.js";
import userRoute from "./routes/user.routes.js";
import canalMateriaRoutes from './routes/canalMateria.routes.js';
import calificacion from './routes/calificacion.routes.js';
import vistasYprocedimientos from './routes/vistas.routes.js';

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



app.use(
  session({
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

