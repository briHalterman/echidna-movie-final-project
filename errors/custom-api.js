// CUSTOM API ERROR
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

// export custom API error
module.exports = CustomAPIError;
