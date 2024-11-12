import express from 'express';
import {
  createSimulationResult,
  getSimulationResults,
  getSimulationResultById,
  updateSimulationResult,
  deleteSimulationResult
} from '../controllers/simulationResult.controller.js';

const router = express.Router();

router.post('/', createSimulationResult);
router.get('/', getSimulationResults);
router.get('/:id', getSimulationResultById);
router.put('/:id', updateSimulationResult);
router.delete('/:id', deleteSimulationResult);

export default router;
