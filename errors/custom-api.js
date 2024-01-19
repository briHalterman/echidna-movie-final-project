// CUSTOM API ERROR
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  };
};

module.exports = CustomAPIError;