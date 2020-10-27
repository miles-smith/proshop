import express from 'express';

import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  createUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', [protect, requireAdmin, getUsers]);
router.post('/', createUser);
router.post('/login', authenticateUser);
router.route('/profile')
  .get([protect, getUserProfile])
  .patch([protect, updateUserProfile]);

export default router;
