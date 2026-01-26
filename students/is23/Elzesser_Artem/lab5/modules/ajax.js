// modules/ajax.js - НОВАЯ версия с fetch
class Ajax {
    async post(url, callback) {
        console.log('📡 Fetch запрос:', url.substring(0, 80) + '...');
        
        try {
            // 1. Делаем запрос с помощью fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            
            console.log(`📊 Статус ответа: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ошибка: ${response.status}`);
            }
            
            // 2. Парсим JSON ответ
            const data = await response.json();
            console.log('✅ Ответ получен');
            
            // 3. Обработка ошибок VK API
            if (data.error) {
                console.error('❌ VK API Error:', data.error);
                throw new Error(`VK API: ${data.error.error_msg}`);
            }
            
            // 4. Передаем данные в callback
            if (data.response) {
                if (Array.isArray(data.response)) {
                    // users.get: {response: [{...}]}
                    callback(data.response);
                } else if (data.response.items) {
                    // groups.getMembers: {response: {items: [...]}}
                    callback(data.response);
                } else {
                    callback(data.response);
                }
            } else {
                callback(data || {});
            }
            
        } catch (error) {
            console.error('❌ Ошибка fetch:', error.message);
            
            // Пробуем старый метод как fallback (для совместимости)
            try {
                console.log('🔄 Пробую XMLHttpRequest как запасной вариант...');
                this.xhrFallback(url, callback);
            } catch (fallbackError) {
                console.error('❌ Оба метода не сработали');
                callback({ items: [] });
            }
        }
    }
    
    // Запасной метод на XMLHttpRequest
    xhrFallback(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    callback(data.response || data);
                } catch (e) {
                    console.error('Ошибка парсинга в fallback:', e);
                    callback({ items: [] });
                }
            } else {
                callback({ items: [] });
            }
        };
        
        xhr.onerror = () => {
            callback({ items: [] });
        };
        
        xhr.send();
    }
}

export const ajax = new Ajax();