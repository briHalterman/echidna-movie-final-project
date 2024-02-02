// AUTHENTICATION CONTROLLER

const jwt = require('jsonwebtoken');

// import model
const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
  // res.send('register user');
  const { username, email, password } = req.body;
  if(!username || !email || !password){
    throw new BadRequestError('Please provide username, email & password');
  };

  const id = new Date().getDate(); //just for demo

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn:'30d'});

  const user = await User.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice

  console.log(username, email, password);
  // console.log(req.headers);

  res.status(StatusCodes.CREATED).json({ user, token });
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
    console.log(decoded);
  } catch (error) {
    throw new BadRequestError('Not authorized to access this route');
  }

  // console.log(username, password);
  // console.log(req.headers);
  // console.log(token);

  res.status(200).send('login user');
};

module.exports = {
  register,
  login
};