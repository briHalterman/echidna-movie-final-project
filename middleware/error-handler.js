// ERROR HANDLER MIDDLEWARE

// require custom API error (from errors)
const { CustomAPIError } = require("../errors");
// require status codes package
const { StatusCodes } = require("http-status-codes");

// error handler middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

// export error handler middleware
module.exports = errorHandlerMiddleware;
