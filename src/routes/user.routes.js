import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserBasic,
  updatePassword
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.put('/:id/basic', updateUserBasic);
router.put('/:id/password', updatePassword);




export default router;
