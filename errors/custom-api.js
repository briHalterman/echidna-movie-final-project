// CUSTOM API ERROR

// custom API error
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

// export custom API error
module.exports = CustomAPIError;
