// components/ProductCardComponent.js - исправляем фото
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, clickCardCallback) {
        console.log('🃏 Рендер карточки, фото доступны:', {
            photo_400_orig: !!data.photo_400_orig,
            photo_200: !!data.photo_200,
            photo_100: !!data.photo_100
        });
        
        const cardHTML = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', cardHTML);

        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🖱️ Кнопка "Подробнее" нажата для пользователя ID:', data.id);
                clickCardCallback(data.id);
            });
        }
    }

    getHTML(data) {
        // Получаем фото (пробуем все варианты)
        const photo = this.getPhotoForCard(data);
        const firstName = data.first_name || 'Имя';
        const lastName = data.last_name || 'не указано';
        const userId = data.id || '?';
        
        // Показываем онлайн статус
        const onlineStatus = data.online ? 
            '<span class="badge bg-success">Онлайн</span>' : 
            '<span class="badge bg-secondary">Оффлайн</span>';
        
        return `
            <div class="col mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="position-relative">
                        <img src="${photo}" 
                             class="card-img-top" 
                             alt="${firstName} ${lastName}"
                             style="height: 250px; object-fit: cover;"
                             onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300/cccccc/969696?text=No+Photo'">
                        <div class="position-absolute top-0 end-0 m-2">
                            ${onlineStatus}
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${firstName} ${lastName}</h5>
                        <p class="card-text">
                            <small class="text-muted">ID: ${userId}</small>
                        </p>
                        <div class="mt-auto">
                            <button class="btn btn-primary w-100" 
                                    id="click-card-${userId}" 
                                    data-id="${userId}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle me-2" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Метод для получения фото карточки
    getPhotoForCard(userData) {
        // Порядок приоритета
        const photoFields = ['photo_400_orig', 'photo_200', 'photo_100'];
        
        for (const field of photoFields) {
            if (userData[field] && userData[field].startsWith('http')) {
                return userData[field];
            }
        }
        
        return 'https://via.placeholder.com/300x300/cccccc/969696?text=No+Photo';
    }
}