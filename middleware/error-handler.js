// ERROR HANDLER MIDDLEWARE

// import custom API error (from errors)
// const { CustomAPIError } = require("../errors");
// require status codes package
const { StatusCodes } = require("http-status-codes");

// error handler middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors)
      .map((item)=>item.message)
      .join(', ')
    customError.statusCode = 400
  }

  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg })
};

// export error handler middleware
module.exports = errorHandlerMiddleware;
