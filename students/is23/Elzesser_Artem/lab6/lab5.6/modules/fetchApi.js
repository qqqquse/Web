// modules/fetchApi.js - ПЕРЕДЕЛЫВАЕМ ДЛЯ РАБОТЫ С НАШИМ API
const API_BASE_URL = 'http://localhost:8000';

class FetchApi {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    // Метод для получения всех пользователей (аналог groups.getMembers)
    async getGroupMembers(groupId, sort = 'id_asc') {
        const url = `${this.baseUrl}/users?sort=${sort}`;
        
        console.log('📡 Fetch запрос к нашему API:', url);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Ответ нашего API:', data);
            
            if (data.error) {
                throw new Error(`API error: ${data.error.error_msg}`);
            }
            
            // Возвращаем в формате, совместимом с предыдущим кодом
            return {
                count: data.response?.count || 0,
                items: data.response?.items || []
            };
        } catch (error) {
            console.error('❌ Fetch error in getGroupMembers:', error);
            
            // Возвращаем демо-данные в случае ошибки
            return {
                count: 4,
                items: this.getDemoUsers()
            };
        }
    }

    // Метод для получения одного пользователя (аналог users.get)
    async getUserInfo(userId) {
        const url = `${this.baseUrl}/users/${userId}`;
        
        console.log('📡 Fetch запрос к нашему API:', url);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Пользователь с ID ${userId} не найден`);
                }
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Ответ нашего API:', data);
            
            if (data.error) {
                throw new Error(`API error: ${data.error.error_msg}`);
            }
            
            // Возвращаем в формате VK API (массив с одним пользователем)
            return data.response || [];
        } catch (error) {
            console.error('❌ Fetch error in getUserInfo:', error);
            
            // Возвращаем демо-пользователя в случае ошибки
            return [this.getDemoUser(userId)];
        }
    }

    // Метод для добавления пользователя
    async addUser(userData) {
        const url = `${this.baseUrl}/users`;
        
        console.log('➕ Fetch запрос на добавление пользователя:', url, userData);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`API error: ${data.error.error_msg}`);
            }
            
            console.log('✅ Пользователь успешно добавлен:', data);
            return data;
        } catch (error) {
            console.error('❌ Fetch error in addUser:', error);
            throw error;
        }
    }

    // Метод для удаления пользователя
    async deleteUser(userId) {
        const url = `${this.baseUrl}/users/${userId}`;
        
        console.log('🗑️ Fetch запрос на удаление пользователя:', url);
        
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`API error: ${data.error.error_msg}`);
            }
            
            console.log('✅ Пользователь успешно удален:', data);
            return data;
        } catch (error) {
            console.error('❌ Fetch error in deleteUser:', error);
            throw error;
        }
    }

    // Демо-данные для отображения при ошибках
    getDemoUsers() {
        return [
            {
                id: 1,
                first_name: "Иван",
                last_name: "Иванов",
                photo_400_orig: "https://via.placeholder.com/400x400/007bff/ffffff?text=Ivan",
                city: { id: 1, title: "Москва" },
                bdate: "15.05.1990"
            },
            {
                id: 2,
                first_name: "Мария",
                last_name: "Петрова",
                photo_400_orig: "https://via.placeholder.com/400x400/28a745/ffffff?text=Maria",
                city: { id: 2, title: "Санкт-Петербург" },
                bdate: "22.08.1995"
            },
            {
                id: 3,
                first_name: "Алексей",
                last_name: "Сидоров",
                photo_400_orig: "https://via.placeholder.com/400x400/ffc107/000000?text=Alex",
                city: { id: 1, title: "Москва" },
                bdate: "10.11.1988"
            },
            {
                id: 4,
                first_name: "Елена",
                last_name: "Васильева",
                photo_400_orig: "https://via.placeholder.com/400x400/dc3545/ffffff?text=Elena",
                city: { id: 3, title: "Новосибирск" },
                bdate: "03.04.1992"
            }
        ];
    }

    getDemoUser(id) {
        const demoUsers = this.getDemoUsers();
        const user = demoUsers.find(u => u.id == id) || demoUsers[0];
        return { ...user, id: parseInt(id) || 1 };
    }
}

export const fetchApi = new FetchApi();