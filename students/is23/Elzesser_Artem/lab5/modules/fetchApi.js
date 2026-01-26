
import { accessToken, version, useMockData } from "./consts.js";
import { mockData } from "./mockData.js";

class FetchApi {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    // Метод для groups.getMembers
    async getGroupMembers(groupId, sort = 'id_asc') {
        console.log(`📡 Запрос участников группы (mock: ${useMockData})`);
        
        // Если используем тестовые данные
        if (useMockData) {
            console.log('🎯 Использую тестовые данные');
            
            // Имитируем асинхронный запрос
            return new Promise((resolve) => {
                setTimeout(() => {
                    const sortedItems = mockData.sortMembers(mockData.groupMembers.items, sort);
                    resolve({
                        count: sortedItems.length,
                        items: sortedItems
                    });
                }, 300); // Небольшая задержка для имитации сети
            });
        }
        
        // Реальный запрос к VK API
        const url = `${this.url}/groups.getMembers?group_id=${groupId}&sort=${sort}&fields=photo_400_orig&${this.commonInfo}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`VK API error: ${data.error.error_msg}`);
            }
            
            return data.response;
        } catch (error) {
            console.error('Fetch error in getGroupMembers:', error);
            
            // Если реальный API недоступен, возвращаем тестовые данные как fallback
            console.log('🔄 Возвращаю тестовые данные как fallback');
            const sortedItems = mockData.sortMembers(mockData.groupMembers.items, sort);
            return {
                count: sortedItems.length,
                items: sortedItems
            };
        }
    }

    // Метод для users.get
    async getUserInfo(userId) {
        console.log(`📡 Запрос информации о пользователе ${userId} (mock: ${useMockData})`);
        
        // Если используем тестовые данные
        if (useMockData) {
            console.log('🎯 Использую тестовые данные');
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    const user = mockData.userDetails[userId];
                    if (user) {
                        resolve([user]);
                    } else {
                        // Создаем тестового пользователя, если ID не найден
                        resolve([{
                            id: userId,
                            first_name: "Тестовый",
                            last_name: "Пользователь",
                            photo_400_orig: "https://via.placeholder.com/400x400/cccccc/969696?text=Test+User",
                            city: { title: "Тестовый город" },
                            bdate: "01.01.2000",
                            online: 1
                        }]);
                    }
                }, 300);
            });
        }
        
        // Реальный запрос к VK API
        const url = `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`VK API error: ${data.error.error_msg}`);
            }
            
            return data.response;
        } catch (error) {
            console.error('Fetch error in getUserInfo:', error);
            
            // Fallback на тестовые данные
            const user = mockData.userDetails[userId] || {
                id: userId,
                first_name: "Ошибка",
                last_name: "Загрузки",
                photo_400_orig: "https://via.placeholder.com/400x400/cccccc/969696?text=Error",
                city: { title: "Неизвестно" },
                bdate: "Неизвестно",
                online: 0
            };
            
            return [user];
        }
    }
}

export const fetchApi = new FetchApi();