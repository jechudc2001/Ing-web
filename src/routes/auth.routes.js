// routes/authRoutes.js
import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';  // Importar el controlador

const router = express.Router();

// Ruta para hacer login
router.post('/login', login);
router.get('/logout', logout);



export default router;
