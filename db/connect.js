// CONNECT TO DB
const mongoose = require('mongoose'); // use mongoose

// set up connect and pass in url
const connectDB = (url) => {
  return mongoose.connect(url, {});
};

module.exports = connectDB;

//  Set up .env in the root
// Add MONGO_URI with correct value