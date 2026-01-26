const API_BASE_URL = 'http://localhost:8000';

export class ApiService {
    static async getAllDogs() {
        try {
            const response = await fetch(`${API_BASE_URL}/dogs`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при загрузке собак:', error);
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }

    static async getDogById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/dogs/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при загрузке собаки с ID ${id}:`, error);
            return null;
        }
    }

    static async addDog(dogData) {
        try {
            const response = await fetch(`${API_BASE_URL}/dogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dogData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка при добавлении собаки:', error);
            throw error;
        }
    }

    static async deleteDog(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/dogs/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при удалении собаки с ID ${id}:`, error);
            throw error;
        }
    }
}