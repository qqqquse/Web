import { fetch } from '../modules/fetchAPI.js';
import { urls } from '../modules/urls.js';
import { SortFilterComponent } from '../components/SortFilterComponent.js';
export class MainPage {
    constructor({ parent, onUserClick }) {
        this.parent = parent;
        this.onUserClick = onUserClick;
        this.pageRoot = document.createElement('div');
        this.pageRoot.className = 'container mt-4';
    }
    async getData() {
        try {
            const promise = new Promise((resolve, reject) => {
                fetch.post(urls.getGroupMembers(this.currentSort), (data) => {
                    if (data.response && data.response.items) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('Нет данных в ответе'));
                    }
                });
            });
            const data = await promise;
            this.renderCards(data.response.items);
        }
        catch (error) {
            console.error('Ошибка получения данных:', error);
            this.showErrorMessage('Не удалось загрузить список участников');
        }
    }
    showErrorMessage(message) {
        const container = this.pageRoot.querySelector('#users-container');
        if (!container)
            return;
        container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          ${message}
        </div>
      </div>
    `;
    }
    renderCards(users) {
        const container = this.pageRoot.querySelector('#users-container');
        if (!container)
            return;
        container.innerHTML = '';
        if (users.length === 0) {
            container.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info" role="alert">
            Нет участников для отображения
          </div>
        </div>
      `;
            return;
        }
        users.forEach(user => {
            const photoUrl = user.photo_200 || user.photo_400_orig ||
                user.photo_max_orig || 'https://via.placeholder.com/400x400?text=Нет+фото';
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
        <div class="card h-100">
          <img src="${photoUrl}" class="card-img-top" alt="${user.first_name}">
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
    async render() {
        this.parent.innerHTML = '';
        this.pageRoot.innerHTML = `
      <h1 class="mb-4">Участники сообщества</h1>
      <div id="sort-filter"></div>
      <div class="row" id="users-container">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Загрузка...</span>
            </div>
          </div>
        </div>
      </div>
    `;
        this.parent.appendChild(this.pageRoot);
        this.initFilter();
        await this.getData();
    }
}
