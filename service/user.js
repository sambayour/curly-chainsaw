const userRepository  = require('../repository/user');

class UserService {

    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user);
    }

    async login(user) {
        return await userRepository.login(user);
    }  

    async updateUser(user) {
        return await userRepository.updateUser(user);
    }

    async getUserById(userId) {
        return await userRepository.getUserById(userId);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }

}

module.exports = new UserService();