import asyncHandler from 'express-async-handler';

import { generateToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @description Authenticate user
// @route POST /api/users/login
// @access Public
export const authenticateUser = asyncHandler(
  async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      response.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

// @description Register a new user
// @route POST /api/users
// @access Public
export const createUser = asyncHandler(
  async (request, response) => {
    const { name, email, password } = request.body;

    let user = await User.findOne({ email });

    if(user) {
      response.status(400);
      throw new Error('User already exists');
    }

    user = await User.create({ name, email, password });

    if(user) {
      response.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      response.status(400);
      throw new Error('Invalid user data');
    }
  }
);

// @description Fetch user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(
  async (request, response) => {
    // QUESTION: Is this an unneccessary DB operation? We already have a user instance in the
    // request object?
    const user = await User.findById(request.user._id);

    if(user) {
      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      response.status(404);
      throw new Error('Not Found');
    }
  }
);

// @description Update user profile
// @route PATCH /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(
  async (request, response) => {
    // QUESTION: Is this an unneccessary DB operation? We already have a user instance in the
    // request object?
    let user = await User.findById(request.user._id);

    if(user) {
      user.name = request.body.name || user.name;
      user.email = request.body.email || user.email;

      if(request.body.password) {
        user.password = request.body.password;
      }

      user = await user.save();

      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      response.status(404);
      throw new Error('Not Found');
    }
  }
);

// @description Fetch all users
// @route GET /api/users
// @access Private/Admin
export const getUsers = asyncHandler(
  async (request, response) => {
    const users = await User.find({});

    response.json(users);
  }
);

// @description Fetch a single user
// @route GET /api/users/:id
// @access Private/Admin
export const getUserById = asyncHandler(
  async (request, response) => {
    const user = await User.findById(request.params.id).select('-password');

    if(user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  }
);

// @description Update a single user
// @route PATCH /api/users/:id
// @access Private/Admin
export const updateUser = asyncHandler(
  async (request, response) => {
    const queryOptions = { new: true };
    const { password, ...data } = request.body;

    const user = await User.findByIdAndUpdate(
      request.params.id,
      data,
      queryOptions
    ).select('-password');

    if(user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  }
);

// @description Delete a user
// @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(
  async (request, response) => {
    const user = await User.findByIdAndDelete(request.params.id);
    const status = user ? 204 : 400;

    response.status(status)
      .end();
  }
);
