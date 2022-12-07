const userService  = require('../service/user');

class UserController {

    async getUsers() {
        return await userService.getUsers();
    }

    async createUser(user) {
        return await userService.createUser(user);
    }

    async login(user) {
        return await userService.login(user);
    }

    async updateUser(user) {
        return await userService.updateUser(user);
    }

    async getUserById(userId) {
        return await userService.getUserById(userId);
    }

    async deleteUser(userId) {
        return await userService.deleteUser(userId);
    }
}
module.exports = new UserController();