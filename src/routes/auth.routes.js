const express = require('express');
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/register', authController.UserRegisterController);

module.exports = router;