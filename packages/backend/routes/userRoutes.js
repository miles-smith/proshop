import express from 'express';

import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  createUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', [protect, requireAdmin, getUsers]);
router.post('/', createUser);
router.post('/login', authenticateUser);
router.route('/profile')
  .get([protect, getUserProfile])
  .patch([protect, updateUserProfile]);
router.route('/:id')
  .get([protect, requireAdmin, getUserById])
  .patch([protect, requireAdmin, updateUser])
  .delete([protect, requireAdmin, deleteUser]);

export default router;
