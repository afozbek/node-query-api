const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bcrpt = require('bcryptjs');
router.get('/', userController.getIndex);

router.post('/login', userController.login);

router.post('/signup', userController.signup);

module.exports = router