
const response = require('../../../../response/responses');
const JWT = require('../../../../jwt/generateToken');
const bcrypt = require('bcrypt');
const service = require('../services/userService');

const userModel = require('../../../../models/users.model');

class User {
    
    async signup(req, res) {
        const { email, username, password } = req.body;

        // check email is exists or not
        let isUser = await userModel.findOne({ 
            $or: [{ email: email}, { username: username }]
         });
        
         if (isUser) {
            response.sendError({ errorCode: "userExists", error: "" }, res, 400);
            return;
         }

        //  save the user
        let post = {
            username,
            email,
            password,
        };

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        // set user password to hashed password
        post.password = await bcrypt.hash(post.password, salt);

        service.saveUser(post)
            .then(async data => {

                if (data) {

                    data = data.toJSON();
                    console.log(data);

                    const accessToken = await JWT.generateJwt({ profileId: data.id, expiresIn: '30d', profileType: 'user' });

                    data.accessToken = accessToken;

                    delete data.password;

                    response.sendSuccess({ result: data, successCode: 'signupComplete' }, res, 201);

                } else {
                    response.sendError({ errorCode: "serverError", error: "Unable to save user in db" }, res, 500);
                }

            }).catch(err => {
                response.sendError({ errorCode: "serverError", error: err }, res, 500);
            });
    }

    async login(req, res) {

        const { email, password } = req.body;

        // check email is exists or not
        let user = await userModel.findOne({ 
            email
         });
        
         if (!user) {
            response.sendError({ errorCode: "userNotFound", error: "" }, res, 400);
            return;
         }

         user = user.toJSON();

         // check user password is correct or not
         const validPassword = await bcrypt.compare(password, user.password);

         if (validPassword) {

            // Generate Access Token
            const accessToken = await JWT.generateJwt({ profileId: user.id, expiresIn: '30d', profileType: 'user' });

            user.accessToken = accessToken;

            delete user.password;

            response.sendSuccess({ result: user, successCode: 'login' }, res, 200);            
         }


    }

    async testRoute(req, res) {
        console.log('Code is here');
        response.sendSuccess({ result: [{ id: 1, name: 'John' }, { id: 2, name: 'Alex' }], successCode: 'apiStatus' }, res, 200);
    }
}

module.exports = new User();