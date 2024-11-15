import express from "express";
import path from "path"; // Para manejar rutas de archivos
import { fileURLToPath } from "url";


// Importar rutas
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



// Rutas
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
app.use(renderAdminRoute)
app.use(renderUserRoute)



// Inicia el servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

