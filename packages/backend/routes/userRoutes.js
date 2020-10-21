import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
  createUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', authenticateUser);
router.route('/profile')
  .get([protect, getUserProfile])
  .patch([protect, updateUserProfile]);

export default router;
