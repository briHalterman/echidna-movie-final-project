// Authentication Middleware
// use authentication middleware to protect routes

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors'); // index.js - don't need to specify beyond errors directory

const authenticationMiddleware = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const authHeader = reg.headers.authorization;

  // check for authorization header & check if header starts with "Bearer "
    // space after "Bearer" is optional - after if statement, split token anyway
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication invalid');
  }

  // split token
  const token = authHeader.split(' ')[1]; // turn into array and look for second item in array

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to library routes
    req.user = { userId: payload.userId, name: payload.name }; // userId & name from what comes back from verification
  
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  };

  // invoke next
  next();
};

// export authentication middleware
module.exports = authenticationMiddleware;