const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/isAuth');
const jwt = require('jsonwebtoken');

router.get('/', userController.getIndex);

router.get('/me', isAuth, (req, res, next) => {
    res.status(200).json({
        status: 'Success',
        message: `Hosgeldiniz ${req.body.name}`,
    })
});

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/query', isAuth, userController.postQuery);


module.exports = router;