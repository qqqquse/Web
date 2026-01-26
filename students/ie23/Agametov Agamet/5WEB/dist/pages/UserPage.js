import { fetch } from '../modules/fetchAPI.js';
import { urls } from '../modules/urls.js';
export class UserPage {
    constructor({ parent, userId, onBack }) {
        this.parent = parent;
        this.userId = userId;
        this.onBack = onBack;
    }
    async getData() {
        try {
            const promise = new Promise((resolve, reject) => {
                fetch.post(urls.getUserInfo(this.userId), (data) => {
                    if (data.response && data.response.length > 0) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('Данные пользователя не получены'));
                    }
                });
            });
            const data = await promise;
            this.renderUser(data.response[0]);
        }
        catch (error) {
            console.error('Ошибка получения данных пользователя:', error);
            this.showErrorMessage('Не удалось загрузить информацию о пользователе');
        }
    }
    showErrorMessage(message) {
        this.parent.innerHTML = `
      <div class="container mt-4">
        <button class="btn btn-secondary mb-4" id="back-btn">Назад</button>
        <div class="alert alert-danger" role="alert">
          ${message}
        </div>
      </div>
    `;
        document.getElementById('back-btn')?.addEventListener('click', this.onBack);
    }
    renderUser(user) {
        const photoUrl = user.photo_400_orig || user.photo_max_orig ||
            user.photo_200 || 'https://via.placeholder.com/400x400?text=Нет+фото';
        this.parent.innerHTML = `
      <div class="container mt-4">
        <button class="btn btn-secondary mb-4" id="back-btn">Назад</button>
        
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${photoUrl}" 
                   class="img-fluid rounded-start" alt="${user.first_name}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">${user.first_name} ${user.last_name}</h2>
                <p class="card-text">ID: ${user.id}</p>
                ${user.city ? `<p class="card-text">Город: ${user.city.title}</p>` : ''}
                <p class="card-text">${user.online ? '✅ Онлайн' : '⏺️ Оффлайн'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
        document.getElementById('back-btn')?.addEventListener('click', this.onBack);
    }
    async render() {
        this.parent.innerHTML = `
      <div class="container mt-4">
        <button class="btn btn-secondary mb-4" id="back-btn">Назад</button>
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    `;
        document.getElementById('back-btn')?.addEventListener('click', this.onBack);
        await this.getData();
    }
}
