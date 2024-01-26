// AUTHENTICATION CONTROLLER

// import model
const User = require('../models/user-model');
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  // res.send('register user');
  const user = await User.create({ ...req.body }); // !!! temporarily saving passwords as strings --- very bad practice
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const {username, password} = req.body;
  console.log(username, password);
  res.send('login user');
};

module.exports = {
  register,
  login
};