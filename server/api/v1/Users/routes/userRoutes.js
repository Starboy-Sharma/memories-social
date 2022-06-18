const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

const validate = require('../services/userValidations');

router.post('/signup', validate('signup'), controller.signup);

router.get('/', controller.testRoute);

// router.post('/login', validate('login'), controller.login);


module.exports = router;