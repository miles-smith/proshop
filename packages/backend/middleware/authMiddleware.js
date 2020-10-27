import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

export const protect = asyncHandler(
  async (request, response, next) => {
    let token = request.headers.authorization;

    if(token && token.startsWith('Bearer')) {
      try {
        token = token.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user =
          await User.findById(decodedToken.id)
            .select('-password');

        request.user = user;

        next();
      } catch (e) {
        response.status(401);
        throw new Error(e.message);
      }
    }

    if(!token) {
      response.status(401);
      throw new Error('Unauthorized');
    }
  }
);

export const requireAdmin = (request, response, next) => {
  const user = request.user;

  if(user && user.isAdmin) {
    next();
  } else {
    response.status(401);
    throw new Error('Unauthorized. Admin access only.');
  }
}
