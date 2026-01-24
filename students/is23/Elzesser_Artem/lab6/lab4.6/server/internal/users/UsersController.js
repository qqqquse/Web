const {UsersService} = require('./UsersService');

class UsersController {
    static getUsers(req, res) {
        try {
            const sort = req.query.sort || 'id_asc';
            const users = UsersService.getUsers(sort);
            res.json({ response: users });
        } catch (err) {
            res.status(500).json({ 
                error: {
                    error_code: 1,
                    error_msg: err.message
                }
            });
        }
    }

    static getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = UsersService.getUserById(id);
            res.json({ response: user });
        } catch (err) {
            res.status(404).json({ 
                error: {
                    error_code: 113,
                    error_msg: err.message
                }
            });
        }
    }

    static addUser(req, res) {
        try {
            const result = UsersService.addUser(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ 
                error: {
                    error_code: 100,
                    error_msg: err.message
                }
            });
        }
    }

    static deleteUser(req, res) {
        try {
            const id = req.params.id;
            const result = UsersService.deleteUser(id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ 
                error: {
                    error_code: 113,
                    error_msg: err.message
                }
            });
        }
    }
}

module.exports = {
    UsersController,
};