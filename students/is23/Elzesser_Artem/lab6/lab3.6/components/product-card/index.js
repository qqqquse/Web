export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card dog-card mb-4 shadow-sm" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="${data.breed}" 
                     style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.breed}</h5>
                    <p class="card-text">${data.description}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary btn-details" data-id="${data.id}">
                            Подробнее
                        </button>
                        <button class="btn btn-danger btn-delete" data-id="${data.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onCardClick, onDeleteClick) {
        // Кнопка "Подробнее"
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
}