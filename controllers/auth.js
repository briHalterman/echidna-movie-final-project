// AUTHENTICATION CONTROLLER

// import model
const User = require('../models/User');

const register = async (req, res) => {
  res.send('register user');
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