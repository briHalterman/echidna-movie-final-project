// AUTHENTICATION CONTROLLER
// use JSON web tokens (JWTs) for authenticating user

// import user model
const User = require('../models/user.js');
// import status codes
const { StatusCodes } = require('http-status-codes');
// import bad request error & unauthenticated error (from errors)
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // if(!name || !email || !password){
  //   throw new BadRequestError('Please provide name, email & password');
  // };

  // store user records in MongoDB
  // NEVER EVER store user passwords as strings!
  const user = await user.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice
  // const user = await User.create({ ...tempUser });

  // const token = jwt.sign(
  //   { userId: user._id, name: user.name }, 
  //   process.env.JWT_SECRET, 
  //   {expiresIn:'30d'}
  // );

  const token = user.createJWT();

  // console.log(name, email, password);
  // console.log(req.headers);

  // res.status(StatusCodes.CREATED).json({ msg: 'user created', user, token });
  // res.status(StatusCodes.CREATED).json({ user });
  res.status(StatusCodes.CREATED)
  // .json({user: { name: user.getName() }, token });
  .json({ user: { name: user.name }, token })
  // res.send('register user');
  const { username, email, password } = req.body;
  if(!username || !email || !password){
    throw new BadRequestError('Please provide username, email & password');
  };
};

const login = async (req, res) => {
  // check for email & password in controller
  const { email, password } = req.body;

  // if missing email and/or password values throw bad request error
  if(!email || !password) {
    throw new BadRequestError('Please provide email & password')
  }

  // check for user in database
  const user = await User.findOne({ email });

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   // console.log(decoded);

  //   res.status(StatusCodes.OK)
  //   // .json({ msg: `Hello, ${decoded.name}` });
  //   .json({ user: { name: user.name }, token })
  // } catch (error) {
  //   throw new BadRequestError('Not authorized to access this route');
  // }

  // const authHeader = req.headers.authorization;

  // if(!authHeader || !authHeader.startsWith('Bearer ')){
  //   throw new BadRequestError('No token provided') // "invalid credentials to access this route"
  // }

  // const token = authHeader.split(' ')[1];

  // if user does not exist throw authentication error
  if(!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // compare password using bcrypt library
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