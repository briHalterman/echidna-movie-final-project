// AUTHENTICATION ROUTER
const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

// set up routes
// syntax option 1
router.post('/register', register); // domain/api/v1/auth/register
router.post('/login', login); // domain/api/v1/auth/login

module.exports = router;