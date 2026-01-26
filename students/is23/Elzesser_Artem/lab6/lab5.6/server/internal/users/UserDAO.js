const {UsersRepository} = require('./UsersRepository');

class UserDAO {
    constructor(id, first_name, last_name, photo_400_orig, city, bdate, sex, domain, created_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.photo_400_orig = photo_400_orig;
        this.city = city || {};
        this.bdate = bdate || '';
        this.sex = sex || 0;
        this.domain = domain || '';
        this.created_at = created_at || new Date().toISOString();
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('ID должен быть числом');
        }
        return numberId;
    }

    static _validate(user) {
        if (!user.first_name || !user.last_name) {
            throw new Error('Отсутствуют обязательные поля: first_name, last_name');
        }
        
        if (user.id !== undefined) {
            this._validateId(user.id);
        }
    }

    static find(sort = 'id_asc') {
        const users = UsersRepository.read();
        
        // Применяем сортировку
        let sortedUsers = [...users];
        
        switch(sort) {
            case 'id_asc':
                sortedUsers.sort((a, b) => a.id - b.id);
                break;
            case 'id_desc':
                sortedUsers.sort((a, b) => b.id - a.id);
                break;
            case 'time_asc':
                sortedUsers.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'time_desc':
                sortedUsers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            default:
                sortedUsers.sort((a, b) => a.id - b.id);
        }
        
        return sortedUsers.map((user) => {
            return new this(
                user.id,
                user.first_name,
                user.last_name,
                user.photo_400_orig,
                user.city,
                user.bdate,
                user.sex,
                user.domain,
                user.created_at
            );
        });
    }

    static findById(id) {
        const numberId = this._validateId(id);
        const users = UsersRepository.read();
        const user = users.find((u) => u.id === numberId);
        
        if (!user) {
            throw new Error(`Пользователь с ID ${numberId} не найден`);
        }
        
        return new this(
            user.id,
            user.first_name,
            user.last_name,
            user.photo_400_orig,
            user.city,
            user.bdate,
            user.sex,
            user.domain,
            user.created_at
        );
    }

    static insert(user) {
        this._validate(user);
        
        const users = UsersRepository.read();
        
        // Генерируем новый ID
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        
        const newUser = {
            id: newId,
            first_name: user.first_name,
            last_name: user.last_name,
            photo_400_orig: user.photo_400_orig || `https://via.placeholder.com/400x400/6c757d/ffffff?text=${user.first_name[0]}`,
            city: user.city || {},
            bdate: user.bdate || '',
            sex: user.sex || 0,
            domain: user.domain || user.first_name.toLowerCase(),
            created_at: new Date().toISOString()
        };
        
        UsersRepository.write([...users, newUser]);
        
        return new this(
            newUser.id,
            newUser.first_name,
            newUser.last_name,
            newUser.photo_400_orig,
            newUser.city,
            newUser.bdate,
            newUser.sex,
            newUser.domain,
            newUser.created_at
        );
    }

    static delete(id) {
        const numberId = this._validateId(id);
        const users = UsersRepository.read();
        
        const initialLength = users.length;
        const filteredUsers = users.filter((u) => u.id !== numberId);
        
        if (filteredUsers.length === initialLength) {
            throw new Error(`Пользователь с ID ${numberId} не найден`);
        }
        
        UsersRepository.write(filteredUsers);
        
        return filteredUsers.map((user) => {
            return new this(
                user.id,
                user.first_name,
                user.last_name,
                user.photo_400_orig,
                user.city,
                user.bdate,
                user.sex,
                user.domain,
                user.created_at
            );
        });
    }

    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            photo_400_orig: this.photo_400_orig,
            city: this.city,
            bdate: this.bdate,
            sex: this.sex,
            domain: this.domain,
            created_at: this.created_at
        }
    }
}

module.exports = {
    UserDAO,
}