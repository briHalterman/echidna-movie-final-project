// ERROR HANDLER MIDDLEWARE

// require status codes package
const { StatusCodes } = require("http-status-codes");

// error handler middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  };

  // handle validation error
  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors)
      .map((item)=>item.message)
      .join(', ')
    customError.statusCode = 400
  }

  // handle duplicate email error
  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400;
  }

  // handle cast error
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // response:
  return res.status(customError.statusCode).json({ msg: customError.msg })
};

// export error handler middleware
module.exports = errorHandlerMiddleware;
