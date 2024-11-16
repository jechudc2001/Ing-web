import express from 'express';
import {
    renderExamenes,
    renderEditarExamen,
    renderCrearExamenPage,
    renderActualizarAdmin,
    renderUsuario,
    renderCrearUsuario,
    renderEditarUsuario,
    renderPreguntasPage,
    renderVerPreguntasPage,
    renderCrearPregunta,
    renderManagePreguntasPage,
    renderEditarPregunta,
    renderReglas,
    renderCursos,
    renderVerPreguntasMateria,
    renderCrearCurso,
    renderEditarCurso,
} from '../controllers/renderAdmin.controller.js';

const router = express.Router();


router.get('/Examen', renderExamenes);
router.get('/Editar_Examen/:id', renderEditarExamen); 
router.get('/Crear_Examen',renderCrearExamenPage);
router.get('/actualizarAdmin',renderActualizarAdmin);
router.get('/usuario',renderUsuario)
router.get('/crear_usuario',renderCrearUsuario)
router.get('/editar_usuario/:id', renderEditarUsuario); 
router.get('/verPreguntas', renderPreguntasPage); 
router.get('/verPreguntasExam/:id', renderVerPreguntasPage); 
router.get("/crearPregunta/:id", renderCrearPregunta);
router.get("/preguntas_ver/:id", renderManagePreguntasPage);
router.get("/editar_pregunta/:id", renderEditarPregunta);
router.get("/ExamReglas", renderReglas);
router.get("/cursos",renderCursos);
router.get("/ver_preguntas/:id", renderVerPreguntasMateria);
router.get("/crearCurso",renderCrearCurso);
router.get("/editarCurso/:id",renderEditarCurso);











export default router;
