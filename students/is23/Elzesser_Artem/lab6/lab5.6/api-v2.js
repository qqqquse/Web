const API_BASE_URL = 'http://localhost:8000';

export class ApiServiceV2 {
    // Методы для пользователей
    static async getUsers(sort = 'id_asc') {
        try {
            const response = await fetch(`${API_BASE_URL}/users?sort=${sort}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.response; // {count: X, items: [...]}
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return { count: 0, items: [] };
        }
    }

    static async getUserById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.response; // [user]
        } catch (error) {
            console.error(`Ошибка при загрузке пользователя с ID ${id}:`, error);
            return null;
        }
    }

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
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при удалении пользователя с ID ${id}:`, error);
            throw error;
        }
    }
}