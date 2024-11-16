import express from 'express';
import { 
  crearCanalMateria, 
  obtenerCanalMaterias, 
  obtenerCanalMateriaPorIds, 
  actualizarCanalMateria, 
  eliminarCanalMateria 
} from '../controllers/canalMateria.controller.js';

const router = express.Router();

// Rutas para el controlador
router.post('/', crearCanalMateria); // Crear relación Canal-Materia
router.get('/', obtenerCanalMaterias); // Obtener todas las relaciones
router.get('/:id_canal/:id_materia', obtenerCanalMateriaPorIds); // Obtener relación por IDs
router.put('/:id_canal/:id_materia', actualizarCanalMateria); // Actualizar relación por IDs
router.delete('/:id_canal/:id_materia', eliminarCanalMateria); // Eliminar relación por IDs

export default router;
