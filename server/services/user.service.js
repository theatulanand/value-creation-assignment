const userModel = require('../models/user.model');

class UserService {
    async createUser(data) {
        try {
            await userModel.create(data);
        } catch (error) {
            console.log("Error while creating user");
            console.log(error)
        }
    }

    async findUser(filter) {
        let user;
        try {
            user = await userModel.findOne(filter);
            return user;
        } catch (error) {
            console.log("Error while finding user");
            console.log(error)
        }


    }
}

module.exports = new UserService();