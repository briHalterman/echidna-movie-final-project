// CONNECT TO DB

// require mongoode
const mongoose = require('mongoose');

// set up connect and pass in url
const connectDB = (url) => {
  return mongoose.connect(url, {});
};

// export connectDB
module.exports = connectDB;

//  Set up .env in the root
// Add MONGO_URI with correct value