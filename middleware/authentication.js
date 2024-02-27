// Authentication Middleware
// use authentication middleware to protect routes

// require user model
const User = require('../models/User');
// require jsonwebtoken
const jwt = require('jsonwebtoken');
// require unauthenticated error (from errors)
const { UnauthenticatedError } = require('../errors'); // index.js - don't need to specify beyond errors directory

const authenticationMiddleware = async (req, res, next) => {
  // console.log(req.headers.authorization);

  // check for authorization header & check if header starts with "Bearer "
    // space after "Bearer" is optional - after if statement, split token anyway
  const authHeader = req.headers.authorization;
  // if there is no auth header or if auth header doesn't start with "Bearer " throw authentication error
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication invalid');
  }

  // split token into array on empty space
  const token = authHeader.split(' ')[1]; // second item ([1])

  try {
    // get payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user payload to library routes
    req.user = { userId: payload.userId, name: payload.name }; // name for testing

    // Alternately:
    // const user = User.findById(payload.id).select('-password); // select to remove password
    // req.user = user;
    // // no function to remove user anyway

  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  };

  // invoke next
  next();
};

// export authentication middleware
module.exports = authenticationMiddleware;