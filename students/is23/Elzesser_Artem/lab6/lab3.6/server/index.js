const express = require('express');
const cors = require('cors');

const dogsRouter = require('./internal/dogs');

const app = express();
const host = 'localhost';
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/dogs', dogsRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Сервер работает нормально' });
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
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
    console.log(`Доступные endpoint'ы:`);
    console.log(`  GET  http://${host}:${port}/dogs - все собаки`);
    console.log(`  GET  http://${host}:${port}/dogs/:id - одна собака по ID`);
    console.log(`  POST http://${host}:${port}/dogs - добавить собаку`);
    console.log(`  DELETE http://${host}:${port}/dogs/:id - удалить собаку по ID`);
});