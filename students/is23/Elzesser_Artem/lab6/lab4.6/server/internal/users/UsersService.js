const {UserDAO} = require('./UserDAO');

class UsersService {
    static getUsers(sort = 'id_asc') {
        const users = UserDAO.find(sort);
        return {
            count: users.length,
            items: users.map((user) => user.toJSON())
        };
    }

    static getUserById(id) {
        const user = UserDAO.findById(id);
        return [user.toJSON()]; // Возвращаем массив как VK API
    }

    static addUser(userData) {
        const user = UserDAO.insert(userData);
        return {
            message: 'Пользователь успешно добавлен',
            user: user.toJSON()
        };
    }

    static deleteUser(id) {
        const remainingUsers = UserDAO.delete(id);
        return {
            message: `Пользователь с ID ${id} удален`,
            remainingUsers: remainingUsers.map(user => user.toJSON())
        };
    }
}

module.exports = {
    UsersService,
}