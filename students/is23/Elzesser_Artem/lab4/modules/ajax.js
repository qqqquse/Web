// modules/ajax.js - ИСПРАВЛЕННАЯ версия
class Ajax {
    post(url, callback) {
        console.log('📡 Отправка запроса:', url.substring(0, 80) + '...');
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`📊 Статус: ${xhr.status}`);
                
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        console.log('✅ Ответ API получен');
                        
                        // Обработка ошибок VK API
                        if (data.error) {
                            console.error('❌ VK API Error:', data.error);
                            alert('Ошибка VK API: ' + data.error.error_msg);
                            return;
                        }
                        
                        // РАЗНЫЕ ФОРМАТЫ ОТВЕТОВ VK API:
                        // 1. Для groups.getMembers: {response: {count: X, items: [...]}}
                        // 2. Для users.get: {response: [{...}]} (массив с одним пользователем)
                        // 3. Другие форматы
                        
                        if (data.response) {
                            // Если response - массив (users.get)
                            if (Array.isArray(data.response)) {
                                console.log('👤 Формат: users.get (массив)');
                                callback(data.response);
                            }
                            // Если response - объект с items (groups.getMembers)
                            else if (data.response.items) {
                                console.log('👥 Формат: groups.getMembers (объект с items)');
                                callback(data.response);
                            }
                            // Другие форматы
                            else {
                                console.log('📦 Формат: другой', data.response);
                                callback(data.response);
                            }
                        } else {
                            console.warn('⚠️ Неожиданный формат:', data);
                            callback(data || {});
                        }
                    } catch (e) {
                        console.error('❌ Ошибка парсинга JSON:', e);
                        console.log('📄 Сырой ответ:', xhr.responseText.substring(0, 200));
                    }
                } else {
                    console.error(`❌ HTTP ошибка: ${xhr.status}`);
                }
            }
        };
        
        xhr.onerror = () => {
            console.error('🌐 Сетевая ошибка');
        };
        
        xhr.send();
    }
}

export const ajax = new Ajax();