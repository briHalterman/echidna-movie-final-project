// AUTHENTICATION ROUTER

// require & invoke express
const express = require('express');
const router = express.Router();
// require login & register controllers
const { login, register } = require('../controllers/auth');

// set up routes
// syntax option 1
router.post('/register', register); // domain/api/v1/auth/register
router.post('/login', login); // domain/api/v1/auth/login

// export router
module.exports = router;