import express from 'express';
import {
  createExamType,
  getExamTypes,
  getExamTypeById,
  updateExamType,
  deleteExamType
} from '../controllers/examType.controller.js';

const router = express.Router();

router.post('/', createExamType);
router.get('/', getExamTypes);
router.get('/:id', getExamTypeById);
router.put('/:id', updateExamType);
router.delete('/:id', deleteExamType);

export default router;
