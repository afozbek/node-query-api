const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/isAuth');
const jwt = require('jsonwebtoken');

router.get('/', userController.getIndex);

router.get('/me', isAuth, () => {
    console.log('Furkan Ozbek');
});

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/query', isAuth, userController.postQuery);

router.post('/deneme', isAuth, (req, res) => {
    res.send({
        message: 'Basarili bir sekilde post edildi'
    })
});

module.exports = router;