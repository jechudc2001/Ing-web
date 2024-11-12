import express from 'express';
import {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam
} from '../controllers/exam.controller.js';

const router = express.Router();

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExamById);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
