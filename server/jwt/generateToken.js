require('dotenv').config();
const jwt = require('jsonwebtoken');
const response = require('../response/responses');
const secretKey = process.env.ACCESS_TOKEN_SECRET;


function generateJwt(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn: payload.expiresIn }, (error, token) => {
            if (error) {
                console.log('generateJwt ->', error);
                reject(error);
                response.sendError({ error, errorCode: 'apiStatus' });
            } else {
                console.log('TOKEN GENERATED'); 
                resolve(token);
            }
        })
    });
}

module.exports = {generateJwt};