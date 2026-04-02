import { ProductPage } from "../product/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { CardManager } from "../../modules/card-manager.js";
import { FilterComponent } from "../../components/filter/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = '';
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get filterRoot() {
        return document.getElementById('filter-root');
    }

    getHTML() {
        return `
            <div>
            <h1 class="text-center text-primary my-4">VK Api</h1>

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div id="filter-root"></div>
                <button id="add-card-btn" class="btn btn-success">Добавить карточку</button>
            </div>

            <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3 align-items-stretch"></div>
        </div>
        `;
    }

    clickCard(e) {
        const id = e.target.dataset.id;
        const title = e.target.dataset.title;
        const src = e.target.dataset.src;

        const productPage = new ProductPage(this.parent, title, src, id);
        productPage.render();
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    async loadData(filter = '') {
        const data = await ajax.get(urls.getGroupMembers(filter));
        if (!data) return;

        this.renderData(data.response.items);
    }

    onFilterChange(filter) {
        this.currentFilter = filter;
        this.loadData(this.currentFilter);
    }

    async render() {
        this.parent.innerHTML = '<div id="main-page" class="d-flex flex-wrap gap-3"></div>';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.cardManager = new CardManager(this.pageRoot, ProductCardComponent);
        this.cardManager.handleCardClick = (e, data) => {
            console.log('Клик по карточке', data);
            this.parent,
            data.first_name + ' ' + data.last_name,
            data.photo_400_orig,
            data.id
        };
        const data = await ajax.get(urls.getGroupMembers());
            if (data?.response?.items) {
            this.cardManager.setCards(data.response.items);
        }

        const addBtn = document.getElementById('add-card-btn');
    addBtn.addEventListener('click', () => {
        const newCard = {
            id: Date.now(),
            first_name: 'Новая',
            last_name: 'Карточка',
            photo_400_orig: 'https://via.placeholder.com/400x400.png?text=New+Card'
        };
        this.cardManager.addCard(newCard);
    });
        
        const filterComponent = new FilterComponent(this.filterRoot);
        filterComponent.render(this.onFilterChange.bind(this));

        await this.loadData();
    }
}