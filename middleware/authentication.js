// Authentication Middleware
// use authentication middleware to protect routes

const authenticationMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization);
  next();
};

module.exports = authenticationMiddleware;