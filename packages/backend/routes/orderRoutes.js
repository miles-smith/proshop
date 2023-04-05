import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', [protect, createOrder]);
router.get('/:id', [protect, getOrderById]);

export default router;
