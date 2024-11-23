// routes/authRoutes.js
import express from 'express';
import { calcularPuntaje } from '../controllers/calificacion.controller.js';  // Importar el controlador

const router = express.Router();

// Ruta para hacer login
router.post('/calcular', calcularPuntaje);




export default router;
