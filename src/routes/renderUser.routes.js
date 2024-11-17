import express from 'express';
import {
    renderUserDashboard,
    renderUserSeleccionarExamen,
    renderUserCuenta,
    renderUserModoPractica,
    renderUserCursos,
    renderUserModoPracticaCurso


} from '../controllers/renderUser.controller.js';

const router = express.Router();

router.get('/userDashboard', renderUserDashboard);
router.get('/userSeleccionarExamen/:id', renderUserSeleccionarExamen);
router.get('/userCuenta', renderUserCuenta);
router.get('/userModoPractica', renderUserModoPractica);
router.get('/userCurso', renderUserCursos);
router.get('/userModoPracticaCursos/:id/:cantidad', renderUserModoPracticaCurso);









export default router;
