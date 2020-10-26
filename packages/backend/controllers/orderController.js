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
