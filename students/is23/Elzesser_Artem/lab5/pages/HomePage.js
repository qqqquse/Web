// pages/HomePage.js
import { fetchApi } from "../modules/fetchApi.js";
import { groupId } from "../modules/consts.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";

export class HomePage {
    constructor(parent, clickCardCallback) {
        this.parent = parent;
        this.pageRoot = null;
        this.clickCard = clickCardCallback;
        this.currentSort = 'id_asc';
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('home-page-root');
        if (!this.pageRoot) return;

        this.renderSortFilter();
        this.getData();
    }

    renderSortFilter() {
        const filterHTML = `
            <div class="mb-4">
                <h1>Участники группы</h1>
                <p class="text-muted">Выберите пользователя для просмотра подробной информации</p>
                <label for="sort-select" class="form-label">Сортировать участников по:</label>
                <select class="form-select" id="sort-select">
                    <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>ID (по возрастанию)</option>
                    <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>ID (по убыванию)</option>
                    <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>Дате вступления (старые)</option>
                    <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>Дате вступления (новые)</option>
                </select>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('afterbegin', filterHTML);

        const select = document.getElementById('sort-select');
        select.addEventListener('change', (event) => {
            this.currentSort = event.target.value;
            this.getData();
        });
    }

    async getData() {
        const oldCardsContainer = document.getElementById('cards-container');
        if (oldCardsContainer) oldCardsContainer.remove();

        const cardsContainer = document.createElement('div');
        cardsContainer.id = 'cards-container';
        cardsContainer.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
        this.pageRoot.appendChild(cardsContainer);

        try {
            const data = await fetchApi.getGroupMembers(groupId, this.currentSort);
            this.renderData(data.items, cardsContainer);
        } catch (error) {
            console.error('Error loading group members:', error);
            cardsContainer.innerHTML = `<div class="alert alert-danger">Ошибка загрузки: ${error.message}</div>`;
        }
    }

    renderData(items, container) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard);
        });
    }

    getHTML() {
        return `<div id="home-page-root" class="container mt-4"></div>`;
    }
}