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
            button.addEventListener('click', () => {
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
        
        return `
            <div class="col mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${photo}" 
                         class="card-img-top" 
                         alt="${firstName} ${lastName}"
                         style="height: 250px; object-fit: cover;"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300/cccccc/969696?text=No+Photo'">
                    <div class="card-body">
                        <h5 class="card-title">${firstName} ${lastName}</h5>
                        <p class="card-text">
                            <small class="text-muted">ID: ${userId}</small>
                        </p>
                        <button class="btn btn-primary w-100" 
                                id="click-card-${userId}" 
                                data-id="${userId}">
                            Подробнее
                        </button>
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