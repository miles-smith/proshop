import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(
  async (request, response) => {
    const products = await Product.find({});

    response.json(products);
  }
);

// @description Create a product
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(
  async (request, response) => {
    const product = await Product.create(request.body);
    if(product) {
      response.status(201).json(product);
    } else {
      response.status(401).end();
    }
  }
);

// @description Fetch a single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(
  async (request, response) => {
    const product = await Product.findById(request.params.id);

    if(product) {
      response.json(product);
    } else {
      response.status(404);
      throw new Error('Product not found');
    }
  }
);

// @description Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(
  async (request, response) => {
    const product = await Product.findByIdAndDelete(request.params.id);
    const status = product ? 204 : 400;

    response.status(status).end();
  }
);
