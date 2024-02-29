// USER MODEL

// require mongoose
const mongoose = require('mongoose');
// require bcryptjs
const bcrypt = require('bcryptjs');
// require jsonwebtoken
const jwt = require('jsonwebtoken');

// name, email & password
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a username'],
    minlength: 4, // alt: minlength
    maxlength: 50 // alt: maxlength
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // email validation regex
      'Please provide a valid email'
    ],
    unique: true // to avoid duplicates
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6, // 8 for security
    maxlength: 12
  } // we will remove maxlength later, once we hash our password
});

// middleware functions
// pre & post hooks - passed control during execution of async function

// hash password before saving the document
UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// schemas instance methods
  // regular function (no async keyword)
  // use function keyword (not arrow function) - so 'this' will always point to the documents
  UserSchema.methods.getName = function () {
    return this.name;
  };

  UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// compare password coming in to password in document
  // compare method - in bcrypt package - compares hashed passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // console.log(candidatePassword);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// export user schema
module.exports = mongoose.model('User', UserSchema);