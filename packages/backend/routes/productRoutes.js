import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// router.route('/').get(getProducts);
router.get('/', getProducts);

router.route('/:id')
  .get(getProductById)
  .delete([protect, requireAdmin, deleteProduct]);

export default router;
