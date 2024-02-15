// AUTHENTICATION CONTROLLER

const User = require('../models/users'); // import model
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // const { username, email, password } = req.body;

  // if(!username || !email || !password){
  //   throw new BadRequestError('Please provide username, email & password');
  // };

  const user = await User.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice
  // const user = await User.create({ ...tempUser });

  // const token = jwt.sign(
  //   { userId: user._id, name: user.username }, 
  //   process.env.JWT_SECRET, 
  //   {expiresIn:'30d'}
  // );

  const token = user.createJWT();

  // console.log(username, email, password);
  // console.log(req.headers);

  // res.status(StatusCodes.CREATED).json({ msg: 'user created', user, token });
  // res.status(StatusCodes.CREATED).json({ user });
  res.status(StatusCodes.CREATED)
  // .json({user: { name: user.getName() }, token });
  .json({ user: { name: user.username }, token })
};

const login = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password){
    throw new BadRequestError('Please provide username & password')
  }

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new BadRequestError('No token provided') // "invalid credentials to access this route"
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    res.status(200).json({ msg: `Hello, ${decoded.username}` });
  } catch (error) {
    throw new BadRequestError('Not authorized to access this route');
  }

  // console.log(username, password);
  // console.log(req.headers);
  // console.log(token);
};

module.exports = {
  register,
  login
};