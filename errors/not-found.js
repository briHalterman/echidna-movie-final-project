// NOT FOUND ERROR

// require status codes package
const { StatusCodes } = require("http-status-codes");
// import custom API error
const CustomAPIError = require("./custom-api");

// not found error
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// export not found error
module.exports = NotFoundError;
