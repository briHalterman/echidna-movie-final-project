// AUTHENTICATION CONTROLLER

const User = require('../models/User.js'); // import model
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // if(!name || !email || !password){
  //   throw new BadRequestError('Please provide name, email & password');
  // };

  const user = await User.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice
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
};

const login = async (req, res) => {
  // initial check for email & password in controller
  const { email, password } = req.body;

  // check for email and password values
  if(!email || !password){
    // if missing, throw bad request error
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

  if(!user){
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // compare password

  const token = user.createJWT();

  // send back user
  // res.status(StatusCodes.OK)
  res.status(StatusCodes.OK)
  .json({ user: { name: user.name }, token });

  // console.log(name, password);
  // console.log(req.headers);
  // console.log(token);
};

module.exports = {
  register,
  login
};