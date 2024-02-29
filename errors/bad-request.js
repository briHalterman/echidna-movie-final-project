// BAD REQUEST ERROR

// require custom API error
const CustomAPIError = require("./custom-api");
// require status codes package
const { StatusCodes } = require("http-status-codes");

//  bad request error
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// export bad request error
module.exports = BadRequestError;
