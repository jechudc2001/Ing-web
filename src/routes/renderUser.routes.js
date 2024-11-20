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


} from '../controllers/renderUser.controller.js';

const router = express.Router();

router.get('/userDashboard', renderUserDashboard);
router.get('/userSeleccionarExamen/:id', renderUserSeleccionarExamen);
router.get('/userCuenta', renderUserCuenta);
router.get('/userModoPractica', renderUserModoPractica);
router.get('/userCurso', renderUserCursos);
router.get('/userModoPracticaCursos/:id/:cantidad', renderUserModoPracticaCurso);
router.get('/', renderPaginaWeb);
router.get('/userModoSimulacro', renderUserModoSimulacro);
router.get('/userCalificacion', renderUserCalificacion);








export default router;
