// CONNECT TO DB

// require mongoose
const mongoose = require('mongoose');

// set up connect and pass in url
const connectDB = (url) => {
  return mongoose.connect(url, {}); // option to remove depreciation warnings not needed
};

// export connectDB
module.exports = connectDB;

//  Set up .env in the root
// Add MONGO_URI with correct value