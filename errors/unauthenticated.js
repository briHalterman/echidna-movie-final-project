// UNAUTHENTICATED ERROR

// require custom API error
const CustomAPIError = require("./custom-api");
// require status codes package
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// export unauthenticated error
module.exports = UnauthenticatedError;
