// ERRORS INDEX.JS
// pull in all the classes to use around the project
// simply reference errors folder, index.js is the default export

// require errors
const CustomAPIError = require('./custom-api');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');

// export errors
module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError
};