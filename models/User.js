// USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// store user name, email & hashed password in db
const UserSchema = new mongoose.Schema({
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
  // Note: Never store passwords in plain text. Instead, cryptographically hash them so even if the database is compromised, passwords are not. Cryptography for password comes from bcryptjs npm package. Hashing is performed in middleware. 
});

// Middleware (pre & post hooks) functions -- passed control during execution of async functions

// hash the password
UserSchema.pre('save', async function() {
  // generate salt (random bytes) by running genSalt & get password
  const salt = await bcrypt.genSalt(10); // pass in number of rounds
  // pass hash method
  this.password = await bcrypt.hash(this.password, salt); // "this" function keyword scopes to document 
  // next();
}); // pre routine for the save operation (before we save the document)
// ALWAYS ALWAYS HASH YOUR PASSWORDS
// NEVER EVER EVER STORE THEM AS STRINGS

// add schema instance methods for generating JWT & validating user password
// use function keyword (not arrow function syntax) so that the function is associated with "this" which is a user instance
// reguar function (no async keyword)

UserSchema.methods.getName = function () {
  return this.name;
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    // don't store secrets
    { userId: this._id, name: this.name }, // use underscore to differentiate IDs 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

// compare password coming in to password in document
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // console.log(candidatePassword);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
} // compare method - in bcrypt package - compares hashed passwords

module.exports = mongoose.model('User', UserSchema)