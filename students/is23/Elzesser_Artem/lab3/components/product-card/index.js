export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card dog-card mb-4 shadow-sm" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="${data.breed}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.breed}</h5>
                    <p class="card-text">${data.description}</p>
                    <button class="btn btn-primary btn-details" data-id="${data.id}">
                        Подробнее о породе
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, onCardClick) {
        const btn = this.parent.querySelector(`[data-id="${data.id}"]`);
        if (btn) {
            btn.addEventListener('click', onCardClick);
        }
    }

    render(data, onCardClick) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onCardClick);
    }
}