const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/isAuth');
const jwt = require('jsonwebtoken');

router.get('/', userController.getIndex);

router.get('/me', isAuth);

router.post('/login', userController.login);

router.post('/signup', userController.signup);

module.exports = router;