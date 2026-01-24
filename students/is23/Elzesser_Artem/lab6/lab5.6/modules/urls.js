// modules/urls.js - ИЗМЕНЯЕМ ДЛЯ РАБОТЫ С НАШИМ API
const API_BASE_URL = 'http://localhost:8000';

export class Urls {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    getUserInfo(userId) {
        return `${this.baseUrl}/users/${userId}`;
    }

    getGroupMembers(groupId, sort = 'id_asc') {
        // Игнорируем groupId, используем наш API
        return `${this.baseUrl}/users?sort=${sort}`;
    }

    // Дополнительные методы для CRUD операций
    addUser() {
        return `${this.baseUrl}/users`;
    }

    deleteUser(userId) {
        return `${this.baseUrl}/users/${userId}`;
    }
}

export const urls = new Urls();