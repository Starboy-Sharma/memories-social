
const response = require('../../../../response/responses');
const JWT = require('../../../../jwt/generateToken');

class User {
    
    async signup(req, res) {
        console.log('You can post a new user'); 
    }

    async testRoute(req, res) {
        console.log('Code is here');
        response.sendSuccess({ result: [{ id: 1, name: 'John' }, { id: 2, name: 'Alex' }], successCode: 'apiStatus' }, res, 200);
    }
}

module.exports = new User();