const {DogsRepository} = require('./DogsRepository');

class DogDAO {
    constructor(id, breed, description, fullInfo, image) {
        this.id = id;
        this.breed = breed;
        this.description = description;
        this.fullInfo = fullInfo || '';
        this.image = image;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('ID должен быть числом');
        }
        return numberId;
    }

    static _validate(dog) {
        if (!dog.breed || !dog.description || !dog.image) {
            throw new Error('Отсутствуют обязательные поля: breed, description, image');
        }
        
        if (dog.id !== undefined) {
            this._validateId(dog.id);
        }
    }

    static find() {
        const dogs = DogsRepository.read();
        return dogs.map(({id, breed, description, fullInfo, image}) => {
            return new this(id, breed, description, fullInfo, image);
        });
    }

    static findById(id) {
        const numberId = this._validateId(id);
        const dogs = DogsRepository.read();
        const dog = dogs.find((d) => d.id === numberId);
        
        if (!dog) {
            throw new Error(`Собака с ID ${numberId} не найдена`);
        }
        
        return new this(dog.id, dog.breed, dog.description, dog.fullInfo, dog.image);
    }

    static insert(dog) {
        this._validate(dog);
        
        const dogs = DogsRepository.read();
        
        // Генерируем новый ID (максимальный ID + 1)
        const newId = dogs.length > 0 ? Math.max(...dogs.map(d => d.id)) + 1 : 1;
        
        const newDog = {
            id: newId,
            breed: dog.breed,
            description: dog.description,
            fullInfo: dog.fullInfo || '',
            image: dog.image
        };
        
        DogsRepository.write([...dogs, newDog]);
        
        return new this(newDog.id, newDog.breed, newDog.description, newDog.fullInfo, newDog.image);
    }

    static delete(id) {
        const numberId = this._validateId(id);
        const dogs = DogsRepository.read();
        
        const initialLength = dogs.length;
        const filteredDogs = dogs.filter((d) => d.id !== numberId);
        
        if (filteredDogs.length === initialLength) {
            throw new Error(`Собака с ID ${numberId} не найдена`);
        }
        
        DogsRepository.write(filteredDogs);
        
        return filteredDogs.map(({id, breed, description, fullInfo, image}) => {
            return new this(id, breed, description, fullInfo, image);
        });
    }

    toJSON() {
        return {
            id: this.id,
            breed: this.breed,
            description: this.description,
            fullInfo: this.fullInfo,
            image: this.image,
        }
    }
}

module.exports = {
    DogDAO,
}