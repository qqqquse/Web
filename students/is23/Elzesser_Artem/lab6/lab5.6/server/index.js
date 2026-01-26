const express = require('express');
const cors = require('cors');

const usersRouter = require('./internal/users'); // Только пользователи

const app = express();
const host = 'localhost';
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter); // Только маршрут для пользователей

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Сервер работает нормально' });
});

// Test endpoint для проверки
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Сервер лабораторной работы 4 работает!',
        endpoints: {
            users: {
                getAll: 'GET /users?sort=id_asc|id_desc|time_asc|time_desc',
                getOne: 'GET /users/:id',
                add: 'POST /users',
                delete: 'DELETE /users/:id'
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        status: 'Not Found', 
        message: `Путь ${req.url} не найден` 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'Internal Server Error', 
        message: 'Что-то пошло не так на сервере' 
    });
});

app.listen(port, host, () => {
    console.log(`=== Сервер лабораторной работы 4 ===`);
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
    console.log(`\n📋 Доступные endpoint'ы:`);
    console.log(`  GET  http://${host}:${port}/users - все пользователи`);
    console.log(`       Параметры: sort=id_asc|id_desc|time_asc|time_desc`);
    console.log(`  GET  http://${host}:${port}/users/:id - один пользователь по ID`);
    console.log(`  POST http://${host}:${port}/users - добавить пользователя`);
    console.log(`  DELETE http://${host}:${port}/users/:id - удалить пользователя`);
    console.log(`\n🔧 Тестовые endpoint'ы:`);
    console.log(`  GET  http://${host}:${port}/health - проверка работы сервера`);
    console.log(`  GET  http://${host}:${port}/test - информация о сервере`);
    console.log(`\n🚀 Сервер готов к работе!`);
});