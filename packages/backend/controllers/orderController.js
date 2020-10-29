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

// @description Fetch all orders accessible by current user
// @route GET /api/orders
// @access Private
export const getOrders = asyncHandler(
  async (request, response) => {
    const user = request.user;
    const scope = user.isAdmin ? {} : { user };
    const orders = await Order.find(scope).populate('user', 'id name');

    response.json(orders);
  }
)

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

// @description Update paid status
// @route PATCH /api/orders/:id/pay
// @access Private
export const payOrder = asyncHandler(
  async (request, response) => {
    const order = await Order.findById(request.params.id);

    if(order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: request.body.id,
        status: request.body.status,
        update_time: request.body.update_time,
        email_address: request.body.payer.email_address,
      };

      await order.save();

      response.json(order);
    } else {
      response.status(404);
      throw new Error('Order not found');
    }
  }
);
