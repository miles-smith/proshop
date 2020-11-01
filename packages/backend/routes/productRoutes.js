import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post([protect, requireAdmin, createProduct]);

router.get('/top', getTopProducts);

router.route('/:id')
  .get(getProductById)
  .patch([protect, requireAdmin, updateProduct])
  .delete([protect, requireAdmin, deleteProduct]);

router.route('/:id/reviews')
  .post([protect, createProductReview]);

export default router;
