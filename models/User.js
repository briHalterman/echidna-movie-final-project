// USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  // name, email & password
  name: {
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
    minlength: 6, // 8 for security
    // maxlength: 12 // we will remove maxlength later, once we hash our password
  }
});

// Middleware (pre & post hooks) functions -- passed control during execution of async functions

// before we save the document
UserSchema.pre('save', async function() {
  // generate salt & get password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // "this" function keyword scopes to document 
  // next();
});

// Schema Instance Methods

UserSchema.methods.getName = function () {
  return this.name;
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  // console.log(candidatePassword);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema)