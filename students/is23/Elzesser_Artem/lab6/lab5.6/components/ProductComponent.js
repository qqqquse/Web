// components/ProductComponent.js - ОБНОВЛЕН ДЛЯ РАБОТЫ С НАШИМ API
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        console.log('🖼️ Рендер профиля пользователя из нашего API:', data);
        
        const html = this.getHTML(data);
        
        // Ищем контейнер для контента пользователя
        let contentContainer = document.getElementById('user-content');
        if (!contentContainer) {
            // Создаем контейнер если его нет
            contentContainer = document.createElement('div');
            contentContainer.id = 'user-content';
            this.parent.appendChild(contentContainer);
        }
        
        contentContainer.innerHTML = html;
    }

    getHTML(data) {
        // Проверяем, является ли data массивом (как в VK API)
        const user = Array.isArray(data) ? data[0] : data;
        
        if (!user) {
            return `
                <div class="alert alert-danger">
                    <h5>Ошибка</h5>
                    <p>Данные пользователя не получены или имеют неверный формат</p>
                </div>
            `;
        }
        
        // Получаем данные пользователя
        const photoUrl = this.getUserPhoto(user);
        const firstName = user.first_name || 'Имя';
        const lastName = user.last_name || 'не указано';
        const fullName = `${firstName} ${lastName}`.trim();
        const userId = user.id || 'N/A';
        const city = user.city?.title || 'Не указан';
        const bdate = user.bdate || 'Не указана';
        const sex = this.getSexLabel(user.sex);
        const domain = user.domain || `id${userId}`;
        const createdAt = user.created_at ? this.formatDate(user.created_at) : 'Неизвестно';
        
        return `
            <div class="card shadow border-0">
                <div class="row g-0">
                    <!-- Фото пользователя -->
                    <div class="col-md-4">
                        <div class="p-4 text-center bg-light rounded-start">
                            <img src="${photoUrl}" 
                                 class="img-fluid rounded-circle mb-3 border" 
                                 alt="${fullName}"
                                 style="width: 200px; height: 200px; object-fit: cover;"
                                 onerror="this.onerror=null; this.src='https://via.placeholder.com/200x200/cccccc/969696?text=No+Photo'">
                            <h4 class="mb-1">${fullName}</h4>
                            <p class="text-muted mb-0">ID: ${userId}</p>
                            <div class="mt-3">
                                <span class="badge bg-info">Наш API</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Информация -->
                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <div class="mb-4">
                                <h3 class="card-title mb-4 border-bottom pb-3">Профиль пользователя</h3>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <div class="card bg-light border-0 h-100">
                                            <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">Личная информация</h6>
                                                <ul class="list-unstyled mb-0">
                                                    <li class="mb-2">
                                                        <i class="bi bi-person-fill text-primary me-2"></i>
                                                        <strong>Полное имя:</strong> ${fullName}
                                                    </li>
                                                    <li class="mb-2">
                                                        <i class="bi bi-gender-ambiguous text-primary me-2"></i>
                                                        <strong>Пол:</strong> ${sex}
                                                    </li>
                                                    <li class="mb-2">
                                                        <i class="bi bi-calendar text-primary me-2"></i>
                                                        <strong>Дата рождения:</strong> ${bdate}
                                                    </li>
                                                    <li>
                                                        <i class="bi bi-calendar-plus text-primary me-2"></i>
                                                        <strong>Дата регистрации:</strong> ${createdAt}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <div class="card bg-light border-0 h-100">
                                            <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">Контактная информация</h6>
                                                <ul class="list-unstyled mb-0">
                                                    <li class="mb-2">
                                                        <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                                                        <strong>Город:</strong> ${city}
                                                    </li>
                                                    <li class="mb-2">
                                                        <i class="bi bi-person-badge text-primary me-2"></i>
                                                        <strong>Домен:</strong> ${domain}
                                                    </li>
                                                    <li>
                                                        <i class="bi bi-database text-primary me-2"></i>
                                                        <strong>Источник:</strong> Наше API
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Действия -->
                            <div class="mt-4 pt-3 border-top">
                                <div class="alert alert-info">
                                    <h6><i class="bi bi-info-circle me-2"></i>Информация</h6>
                                    <p class="mb-0 small">
                                        Данные загружены из нашего собственного API (localhost:8000).
                                        Вы можете управлять пользователями на главной странице.
                                    </p>
                                </div>
                                
                                <div class="d-flex gap-2 mt-3">
                                    <button class="btn btn-outline-primary" onclick="window.history.back()">
                                        <i class="bi bi-arrow-left me-2"></i>Назад к списку
                                    </button>
                                    <button class="btn btn-primary" id="edit-user-btn" data-id="${userId}">
                                        <i class="bi bi-pencil me-2"></i>Редактировать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Метод для получения фото
    getUserPhoto(userData) {
        // Сначала проверяем стандартные поля
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
        
        // Если нет фото, используем placeholder с инициалами
        const firstName = userData.first_name || '';
        const lastName = userData.last_name || '';
        const initials = (firstName[0] || '') + (lastName[0] || '') || 'U';
        const color = this.getColorFromId(userData.id || 0);
        
        return `https://via.placeholder.com/400x400/${color}/ffffff?text=${encodeURIComponent(initials)}`;
    }
    
    getSexLabel(sexCode) {
        switch(sexCode) {
            case 1:
                return 'Женский';
            case 2:
                return 'Мужской';
            default:
                return 'Не указан';
        }
    }
    
    getColorFromId(id) {
        const colors = [
            '007bff', '28a745', 'ffc107', 'dc3545', 
            '6f42c1', 'e83e8c', 'fd7e14', '20c997'
        ];
        return colors[Math.abs(id) % colors.length];
    }
    
    formatDate(dateString) {
        if (!dateString) return 'Неизвестно';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    }
}