import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrders,
  getOrderById,
  payOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', [protect, getOrders]);
router.post('/', [protect, createOrder]);
router.get('/:id', [protect, getOrderById]);
router.patch('/:id/pay', [protect, payOrder])

export default router;
