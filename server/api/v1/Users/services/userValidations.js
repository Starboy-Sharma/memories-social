const schema =  require('./schema');
const response = require('../../../../response/responses');

function validate(key) {
    return (req, res, next) => {

        if (!schema[key]) {
            throw new Error('Schema ' + key + ' is not found');
        }

        const { error } = schema[key].validate(req.body);
        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log(" details from validation error in verifyOtp ***** ", details);
            const message = details.map(i => i.message).join(',');
            response.sendError({ errorCode: "validationError", error: message }, res, 400)
        }
    }
}

module.exports = validate;