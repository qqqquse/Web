const express = require('express');
const {UsersController} = require('./UsersController');

const router = express.Router();

// GET /users - все пользователи (с поддержкой сортировки)
router.get('/', UsersController.getUsers);
// GET /users/:id - один пользователь
router.get('/:id', UsersController.getUserById);
// POST /users - добавить пользователя
router.post('/', UsersController.addUser);
// DELETE /users/:id - удалить пользователя
router.delete('/:id', UsersController.deleteUser);

module.exports = router;