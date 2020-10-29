import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrders,
  getOrderById,
  payOrder,
  deliverOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', [protect, getOrders]);
router.post('/', [protect, createOrder]);
router.get('/:id', [protect, getOrderById]);
router.patch('/:id/pay', [protect, payOrder])
router.patch('/:id/deliver', [protect, requireAdmin, deliverOrder]);

export default router;
