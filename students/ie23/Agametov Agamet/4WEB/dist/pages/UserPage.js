import { ajax } from '../modules/ajax.js';
import { urls } from '../modules/urls.js';
export class UserPage {
    constructor({ parent, userId, onBack }) {
        this.parent = parent;
        this.userId = userId;
        this.onBack = onBack;
    }
    getData() {
        ajax.post(urls.getUserInfo(this.userId), (data) => {
            if (data.response && data.response.length > 0) {
                this.renderUser(data.response[0]);
            }
        });
    }
    renderUser(user) {
        const photoUrl = user.photo_400_orig || user.photo_max_orig || user.photo_200 || 'https://via.placeholder.com/400x400?text=Нет+фото';
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
                <p class="card-text">${user.online ? 'Онлайн' : 'Оффлайн'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
        document.getElementById('back-btn')?.addEventListener('click', this.onBack);
    }
    render() {
        this.parent.innerHTML = '<div class="container mt-4"><h2>Загрузка...</h2></div>';
        this.getData();
    }
}
