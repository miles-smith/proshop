import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post([protect, requireAdmin, createProduct]);

router.route('/:id')
  .get(getProductById)
  .delete([protect, requireAdmin, deleteProduct]);

export default router;
