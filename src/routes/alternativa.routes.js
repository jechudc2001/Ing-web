import express from 'express';
import { getAlternativasByPregunta
    , createAlternativa
    , deleteAlternativa } 
from '../controllers/alternativa.controller.js';

const router = express.Router();

// Ruta para obtener las alternativas de una pregunta
router.get('/pregunta/:id/alternativas', getAlternativasByPregunta);

// Ruta para crear una nueva alternativa para una pregunta
router.post('/alternativas', createAlternativa);

// Ruta para eliminar una alternativa por ID
router.delete('/alternativas/:id', deleteAlternativa);

export default router;
