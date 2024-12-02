import express from 'express';
import {
  getAprobadosDesaprobados,
  getDistribucionClasificaciones,
  getSimulaciones,
  obtenerEstadisticasPorUsuario,
  spAprobadosDesaprobados,
  spSimulacionesPorUsuario,
} from '../controllers/vistasyproce.controller.js';

const router = express.Router();

// Rutas para vistas
router.get('/vista_aprobados_desaprobados', getAprobadosDesaprobados);
router.get('/vista_distribucion_clasificaciones', getDistribucionClasificaciones);
router.get('/vista_simulaciones', getSimulaciones);

// Rutas para procedimientos almacenados
router.get('/estadisticas_usuario/:usuarioId', obtenerEstadisticasPorUsuario);
router.get('/aprobados_desaprobados/:usuarioId', spAprobadosDesaprobados);
router.get('/simulaciones_usuario/:usuarioId', spSimulacionesPorUsuario);

export default router;




