import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @description Create an Order
// @route POST /api/orders
// @access Private
export const createOrder = asyncHandler(
  async (request, response) => {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = request.body;

    if(orderItems && orderItems.length === 0) {
      response.status(400);
      throw new Error('No order items');
    } else {
      let order = new Order({
        user: request.user._id,
        orderItems,
        shippingDetails,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      await order.save();

      response.status(201)
      response.json(order);
    }
  }
);

// @description Fetch an Order
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(
  async (request, response) => {
    const order = await Order.findById(request.params.id).populate('user', 'email name');

    if(order) {
      response.json(order);
    } else {
      response.status(404);
      throw new Error('Order not found');
    }
  }
);
