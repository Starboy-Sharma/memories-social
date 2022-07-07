const userModel = require('../../../../models/users.model');

class UserService {

    async saveUser(user) {
    
        try {
            const userCollection = new userModel(user);
            const result = await userCollection.save(user);
    
            return result;
    
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new UserService();
