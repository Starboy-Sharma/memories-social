const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { verifyUserToken } = require('../../../../middlewares/auth');

const validate = require('../services/userValidations');

router.post('/signup', validate('signup'), controller.signup);

router.post('/login', validate('login'), controller.login);

router.get('/', controller.testRoute);

// router.post('/login', validate('login'), controller.login);


module.exports = router;