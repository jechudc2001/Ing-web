import express from 'express';
import {
    renderUserDashboard,
    renderUserSeleccionarExamen,
    renderUserCuenta,
    renderUserModoPractica,
    renderUserCursos,
    renderUserModoPracticaCurso,
    renderPaginaWeb,
    renderUserModoSimulacro,
    renderUserCalificacion,
    renderUserGenerarAleatorio,



} from '../controllers/renderUser.controller.js';

const router = express.Router();

router.get('/userDashboard', renderUserDashboard);
router.get('/userSeleccionarExamen/:id', renderUserSeleccionarExamen);
router.get('/userCuenta', renderUserCuenta);
router.get('/userModoPractica/:id', renderUserModoPractica);
router.get('/userCurso', renderUserCursos);
router.get('/userModoPracticaCursos/:id/:cantidad', renderUserModoPracticaCurso);
router.get('/', renderPaginaWeb);
router.get('/userModoSimulacro/:id', renderUserModoSimulacro);
router.get('/userCalificacion', renderUserCalificacion);
router.get('/userGenerarAleatorio', renderUserGenerarAleatorio);








export default router;
