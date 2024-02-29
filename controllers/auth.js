// AUTHENTICATION CONTROLLER
// use JSON web tokens (JWTs) for authenticating user

// import user model
const User = require('../models/User.js');
// import status codes package
const { StatusCodes } = require('http-status-codes');
// import bad request error & unauthenticated error (from errors)
const { BadRequestError, UnauthenticatedError } = require('../errors');

// register controller
const register = async (req, res) => {
  // if(!name || !email || !password){
  //   throw new BadRequestError('Please provide name, email & password');
  // };

  // store user records in MongoDB
  // NEVER EVER store user passwords as strings!
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  // console.log(User);

  console.log(req.body);
  // console.log(req.headers);

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// login controller
const login = async (req, res) => {
  // check for email & password in controller
  const { email, password } = req.body;

  // if missing email and/or password values throw bad request error
  if(!email || !password) {
    throw new BadRequestError('Please provide email & password')
  }

  // check for user in database
  const user = await User.findOne({ email });

  // if user does not exist throw authentication error
  if(!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // compare password using bcrypt library (only happens if there is a user)
  const isPasswordCorrect = await user.comparePassword(password);

  // if password is incorrect throw authentication error
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  // send back user
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

  // console.log(name, password);
  // console.log(req.headers);
  // console.log(token);
};

// export register & login controllers
module.exports = {
  register,
  login
};