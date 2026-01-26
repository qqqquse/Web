import { ajax } from '../modules/ajax.js';
import { urls } from '../modules/urls.js';
import { SortFilterComponent } from '../components/SortFilterComponent.js';
export class MainPage {
    constructor({ parent, onUserClick }) {
        this.parent = parent;
        this.onUserClick = onUserClick;
        this.pageRoot = document.createElement('div');
        this.pageRoot.className = 'container mt-4';
    }
    getData() {
        ajax.post(urls.getGroupMembers(this.currentSort), (data) => {
            if (data.response && data.response.items) {
                this.renderCards(data.response.items);
            }
            else {
                console.error('Нет данных в ответе');
            }
        });
    }
    renderCards(users) {
        const container = this.pageRoot.querySelector('#users-container');
        if (!container)
            return;
        container.innerHTML = '';
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
        <div class="card h-100">
          <img src="${user.photo_200 || user.photo_400_orig || user.photo_max_orig || 'https://via.placeholder.com/400x400?text=Нет+фото'}" 
               class="card-img-top" alt="${user.first_name}">
          <div class="card-body">
            <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
            <button class="btn btn-primary" data-user-id="${user.id}">
              Подробнее
            </button>
          </div>
        </div>
      `;
            const btn = card.querySelector('button');
            btn.addEventListener('click', () => this.onUserClick(user.id));
            container.appendChild(card);
        });
    }
    initFilter() {
        const filterContainer = document.createElement('div');
        filterContainer.id = 'sort-filter';
        this.pageRoot.insertAdjacentElement('afterbegin', filterContainer);
        this.sortFilter = new SortFilterComponent(filterContainer, (sort) => {
            this.currentSort = sort;
            this.getData();
        });
        this.sortFilter.render(this.currentSort);
    }
    render() {
        this.parent.innerHTML = '';
        this.pageRoot.innerHTML = `
      <h1 class="mb-4">Участники сообщества</h1>
      <div id="sort-filter"></div>
      <div class="row" id="users-container"></div>
    `;
        this.parent.appendChild(this.pageRoot);
        this.initFilter();
        this.getData();
    }
}
