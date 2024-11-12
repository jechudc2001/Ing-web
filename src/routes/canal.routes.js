import express from 'express';
import {
  createCanal,
  getCanales,
  getCanalById,
  updateCanal,
  deleteCanal
} from '../controllers/canal.controller.js';

const router = express.Router();

router.post('/', createCanal);
router.get('/', getCanales);
router.get('/:id', getCanalById);
router.put('/:id', updateCanal);
router.delete('/:id', deleteCanal);

export default router;
