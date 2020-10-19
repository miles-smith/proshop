import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRoutes = express.Router();

// @description Fetch all products
// @route GET /api/products
// @access Public
productRoutes.get('/', asyncHandler(async (request, response) => {
  const products = await Product.find({});

  response.json(products);
}));

// @description Fetch a single product
// @route GET /api/products/:id
// @access Public
productRoutes.get('/:id', asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);

  if(product) {
    response.json(product);
  } else {
    response.status(404).json({ message: 'Product not found' });
  }
}));

export default productRoutes;
