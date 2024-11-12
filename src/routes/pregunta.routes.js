import express from 'express';
import upload from '../middleware/uploadMiddleware.js';

import {
  createPregunta,
  getPreguntas,
  getPreguntaById,
  updatePregunta,
  deletePregunta
} from '../controllers/pregunta.controller.js';

const router = express.Router();

router.post('/', upload.single('img'), createPregunta);
router.get('/', getPreguntas);
router.get('/:id', getPreguntaById);
router.put('/:id', upload.single('img'), updatePregunta);
router.delete('/:id', deletePregunta);


export default router;
