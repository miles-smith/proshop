import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { authenticateUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authenticateUser);
router.get('/profile', [protect, getUserProfile]);

export default router;
