import express from 'express';
import {
    createRegla,
    getReglas,
    getReglaById,
    updateRegla,
    deleteRegla
} from '../controllers/regla.controller.js';

const router = express.Router();

router.post('/', createRegla);
router.get('/', getReglas);
router.get('/:id', getReglaById);
router.put('/:id', updateRegla);

router.delete('/:id', deleteRegla);

export default router;
