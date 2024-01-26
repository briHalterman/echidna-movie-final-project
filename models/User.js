// USER MODEL
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    minlength: 4,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // email validation regex
      'Please provide valid email'
    ],
    unique: true // to avoid duplicates
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    maxlength: 12
  } // we will remove maxlength later, once we hash our password
});

module.exports = mongoose.model('user', UserSchema);