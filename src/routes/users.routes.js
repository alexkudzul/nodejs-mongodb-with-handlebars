const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

// Register
router.get('/users/signup', UsersController.renderSignUpForm);
router.post('/users/signup', UsersController.signup);
// Login
router.get('/users/signin', UsersController.renderSignInForm);
router.post('/users/signin', UsersController.signin);
// Logout
router.get('/users/logout', UsersController.logout);

module.exports = router;