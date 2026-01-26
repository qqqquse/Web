// components/ProductComponent.js - БЕЗ лишней кнопки
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        console.log('🖼️ Рендер профиля пользователя');
        
        const html = this.getHTML(data);
        const contentContainer = document.getElementById('user-content') || this.parent;
        contentContainer.innerHTML = html;
    }

    getHTML(data) {
        // Получаем фото
        const photoUrl = this.getUserPhoto(data);
        const firstName = data.first_name || 'Имя';
        const lastName = data.last_name || 'не указано';
        const fullName = `${firstName} ${lastName}`.trim();
        const userId = data.id || 'N/A';
        
        return `
            <div class="card shadow">
                <div class="row g-0">
                    <!-- Фото пользователя -->
                    <div class="col-md-4">
                        <div class="p-3 text-center">
                            <img src="${photoUrl}" 
                                 class="img-fluid rounded" 
                                 alt="${fullName}"
                                 style="max-height: 400px; width: auto;"
                                 onerror="this.onerror=null; this.src='https://via.placeholder.com/400x400/cccccc/969696?text=No+Photo'">
                            <p class="text-muted mt-2 small">ID: ${userId}</p>
                        </div>
                    </div>
                    
                    <!-- Информация -->
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title mb-3">${fullName}</h3>
                            
                            <div class="mb-4">
                                <h5>Информация профиля</h5>
                                <div class="list-group list-group-flush">
                                    ${data.city ? `
                                        <div class="list-group-item">
                                            <strong>Город:</strong> ${data.city.title}
                                        </div>
                                    ` : ''}
                                    
                                    ${data.bdate ? `
                                        <div class="list-group-item">
                                            <strong>Дата рождения:</strong> ${data.bdate}
                                        </div>
                                    ` : ''}
                                    
                                    ${data.online !== undefined ? `
                                        <div class="list-group-item">
                                            <strong>Статус:</strong> 
                                            <span class="badge ${data.online ? 'bg-success' : 'bg-secondary'}">
                                                ${data.online ? 'Онлайн' : 'Оффлайн'}
                                            </span>
                                        </div>
                                    ` : ''}
                                    
                                    <div class="list-group-item">
                                        <strong>Профиль VK:</strong> 
                                        <a href="https://vk.com/id${userId}" target="_blank">
                                            vk.com/id${userId}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- ТОЛЬКО ОДНА КНОПКА -->
                            <div>
                                <a href="https://vk.com/id${userId}" 
                                   target="_blank" 
                                   class="btn btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right me-2" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                    Открыть профиль VK
                                </a>
                            </div>
                            <!-- Кнопка "Назад" уже есть вверху страницы от BackButtonComponent -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Метод для получения фото
    getUserPhoto(userData) {
        const photoFields = [
            'photo_400_orig',
            'photo_max_orig', 
            'photo_200',
            'photo_100',
            'photo_max',
            'photo_50',
            'photo'
        ];
        
        for (const field of photoFields) {
            if (userData[field] && typeof userData[field] === 'string') {
                return userData[field];
            }
        }
        
        for (const field of photoFields) {
            if (userData[field] && typeof userData[field] === 'object' && userData[field].url) {
                return userData[field].url;
            }
        }
        
        return 'https://via.placeholder.com/400x400/cccccc/969696?text=No+Photo';
    }
}