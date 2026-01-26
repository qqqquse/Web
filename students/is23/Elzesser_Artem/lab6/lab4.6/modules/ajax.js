// modules/ajax.js - УПРОЩЕННАЯ ВЕРСИЯ ДЛЯ РАБОТЫ С НАШИМ API
class Ajax {
    post(url, callback) {
        console.log('📡 Отправка запроса к нашему API:', url);
        
        // Определяем метод запроса по URL
        const isDelete = url.includes('/users/') && url.split('/').pop().match(/^\d+$/);
        
        if (isDelete) {
            // Для удаления используем DELETE запрос
            const userId = url.split('/').pop();
            const deleteUrl = `${this.baseUrl}/users/${userId}`;
            
            fetch(deleteUrl, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log('✅ Ответ API (DELETE):', data);
                callback(data);
            })
            .catch(error => {
                console.error('❌ Ошибка запроса:', error);
                callback({ 
                    error: { 
                        error_code: 1, 
                        error_msg: 'Ошибка соединения' 
                    } 
                });
            });
        } else {
            // Для GET запросов используем fetch
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✅ Ответ нашего API:', data);
                    
                    // Форматируем ответ для совместимости
                    if (data.response) {
                        callback(data);
                    } else if (data.items || Array.isArray(data)) {
                        // Если данные уже в правильном формате
                        callback({ response: Array.isArray(data) ? data : data });
                    } else {
                        // Для других форматов
                        callback({ response: data });
                    }
                })
                .catch(error => {
                    console.error('❌ Ошибка запроса:', error);
                    
                    // Возвращаем ошибку в формате VK API для совместимости
                    callback({ 
                        error: { 
                            error_code: 1, 
                            error_msg: error.message || 'Ошибка соединения' 
                        } 
                    });
                });
        }
    }
    
    // Добавляем свойство baseUrl для удобства
    get baseUrl() {
        return 'http://localhost:8000';
    }
}

export const ajax = new Ajax();