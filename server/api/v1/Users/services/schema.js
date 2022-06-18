const Joi = require('joi');

const Schemas = {};

Schemas.signup = Joi.object({
    email: Joi.string().required().lowercase().min(5).email(),
    password: Joi.string().required().min(8),
    username: Joi.string().required().min(3)
});


module.exports = Schemas;
