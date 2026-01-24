// modules/api.js - для работы с нашим собственным API
const API_BASE_URL = 'http://localhost:8000';

export class ApiService {
    // Получить всех пользователей
    static async getUsers(sort = 'id_asc') {
        try {
            const response = await fetch(`${API_BASE_URL}/users?sort=${sort}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Проверяем на наличие ошибок в нашем API
            if (data.error) {
                throw new Error(data.error.error_msg || 'API error');
            }
            
            // Возвращаем данные в формате, совместимом с VK API
            return {
                count: data.response?.count || 0,
                items: data.response?.items || []
            };
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return { count: 0, items: [] };
        }
    }

    // Получить пользователя по ID
    static async getUserById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Пользователь с ID ${id} не найден`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.error_msg || 'API error');
            }
            
            // Возвращаем в формате VK API (массив с одним пользователем)
            return data.response || [];
        } catch (error) {
            console.error(`Ошибка при загрузке пользователя с ID ${id}:`, error);
            return [];
        }
    }

    // Добавить нового пользователя
    static async addUser(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.error_msg || 'API error');
            }
            
            return data;
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            throw error;
        }
    }

    // Удалить пользователя
    static async deleteUser(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.error_msg || 'API error');
            }
            
            return data;
        } catch (error) {
            console.error(`Ошибка при удалении пользователя с ID ${id}:`, error);
            throw error;
        }
    }

    // Обновить пользователя (опционально)
    static async updateUser(id, userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.error_msg || 'API error');
            }
            
            return data;
        } catch (error) {
            console.error(`Ошибка при обновлении пользователя с ID ${id}:`, error);
            throw error;
        }
    }
}