// components/ProductCardComponent.js - ОБНОВЛЕН ДЛЯ РАБОТЫ С НАШИМ API
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        const cityName = data.city?.title || 'Не указан';
        const bdate = data.bdate || 'Не указана';
        const sexIcon = this.getSexIcon(data.sex);
        const photoUrl = data.photo_400_orig || 'https://via.placeholder.com/400x400/cccccc/969696?text=No+Photo';
        
        return `
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative">
                    <img src="${photoUrl}" 
                         class="card-img-top" 
                         alt="${fullName}"
                         style="height: 200px; object-fit: cover;"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200/cccccc/969696?text=No+Photo'">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-primary">ID: ${data.id}</span>
                    </div>
                </div>
                
                <div class="card-body d-flex flex-column">
                    <div class="mb-2">
                        <h5 class="card-title mb-1">${fullName}</h5>
                        ${sexIcon ? `<span class="text-muted small">${sexIcon}</span>` : ''}
                    </div>
                    
                    <div class="mt-auto">
                        <div class="row small text-muted mb-3">
                            <div class="col-6">
                                <i class="bi bi-geo-alt"></i> ${cityName}
                            </div>
                            <div class="col-6">
                                <i class="bi bi-calendar"></i> ${bdate}
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between gap-2">
                            <button class="btn btn-primary btn-sm btn-details flex-fill" 
                                    data-id="${data.id}"
                                    title="Посмотреть профиль">
                                <i class="bi bi-person-circle me-1"></i> Профиль
                            </button>
                            <button class="btn btn-outline-danger btn-sm btn-delete" 
                                    data-id="${data.id}"
                                    title="Удалить пользователя">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pt-0">
                    <small class="text-muted">
                        Добавлен: ${this.formatDate(data.created_at)}
                    </small>
                </div>
            </div>
        `;
    }

    addListeners(data, onCardClick, onDeleteClick) {
        // Кнопка "Профиль"
        const detailBtn = this.parent.querySelector(`.btn-details[data-id="${data.id}"]`);
        if (detailBtn) {
            detailBtn.addEventListener('click', onCardClick);
        }
        
        // Кнопка удаления
        const deleteBtn = this.parent.querySelector(`.btn-delete[data-id="${data.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', onDeleteClick);
        }
    }

    render(data, onCardClick, onDeleteClick) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onCardClick, onDeleteClick);
    }

    getSexIcon(sex) {
        switch(sex) {
            case 1:
                return '♀ Женский';
            case 2:
                return '♂ Мужской';
            default:
                return '';
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'Неизвестно';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }
}