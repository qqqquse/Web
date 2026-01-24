// modules/urls.js - ИЗМЕНЕН ДЛЯ РАБОТЫ С НАШИМ API
export class Urls {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    // Получить информацию о пользователе по ID
    getUserInfo(userId) {
        return `${this.baseUrl}/users/${userId}`;
    }

    // Получить всех пользователей с сортировкой
    getGroupMembers(groupId, sort = 'id_asc') {
        // Параметр groupId игнорируется, так как мы работаем с нашим API
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