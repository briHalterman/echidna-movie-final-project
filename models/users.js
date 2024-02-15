// USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    minlength: 6, // 8 for security
    // maxlength: 12
  } // we will remove maxlength later, once we hash our password
});

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema.methods.getName = function () {
//   return this.username;
// }

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name }, 
    'process.env.JWT_SECRET', 
    { expiresIn: '30d' }
  )
};

module.exports = mongoose.model('users', UserSchema);