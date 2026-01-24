const {DogsService} = require('./DogsService');

class DogsController {
    static getAllDogs(req, res) {
        try {
            const dogs = DogsService.getAllDogs();
            res.json(dogs);
        } catch (err) {
            res.status(500).json({ 
                status: 'Internal Server Error', 
                message: err.message 
            });
        }
    }

    static getDogById(req, res) {
        try {
            const id = req.params.id;
            const dog = DogsService.getDogById(id);
            res.json(dog);
        } catch (err) {
            res.status(404).json({ 
                status: 'Not Found', 
                message: err.message 
            });
        }
    }

    static addDog(req, res) {
        try {
            const newDog = DogsService.addDog(req.body);
            res.status(201).json({
                message: 'Собака успешно добавлена',
                dog: newDog
            });
        } catch (err) {
            res.status(400).json({ 
                status: 'Bad Request', 
                message: err.message 
            });
        }
    }

    static deleteDog(req, res) {
        try {
            const id = req.params.id;
            const result = DogsService.deleteDog(id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ 
                status: 'Not Found', 
                message: err.message 
            });
        }
    }
}

module.exports = {
    DogsController,
};