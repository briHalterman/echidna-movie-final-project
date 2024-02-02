// AUTHENTICATION CONTROLLER

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

  const user = await User.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password){
    throw new BadRequestError('Please provide username & password')
  }
  console.log(username, password);
  res.send('login user');
};

module.exports = {
  register,
  login
};