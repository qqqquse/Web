const {DogDAO} = require('./DogDAO');

class DogsService {
    static getAllDogs() {
        return DogDAO.find().map((dog) => dog.toJSON());
    }

    static getDogById(id) {
        return DogDAO.findById(id).toJSON();
    }

    static addDog(dogData) {
        return DogDAO.insert(dogData).toJSON();
    }

    static deleteDog(id) {
        const remainingDogs = DogDAO.delete(id);
        return {
            message: `Собака с ID ${id} удалена`,
            remainingDogs: remainingDogs.map(dog => dog.toJSON())
        };
    }
}

module.exports = {
    DogsService,
}