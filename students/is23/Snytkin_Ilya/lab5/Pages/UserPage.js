// pages/UserPage.js
import { ProductComponent } from "../components/ProductComponent.js";
import { BackButtonComponent } from "../components/BackButtonComponent.js";
import { urls } from "../modules/urls.js";

export class UserPage {
  constructor(parent, userId, onBack) {
    this.parent = parent;
    this.userId = userId;
    this.onBack = onBack;
  }

  async render() {
    this.parent.innerHTML = '<div class="container mt-4" id="user-container"></div>';
    const container = this.parent.querySelector('#user-container');

    new BackButtonComponent(container).render(this.onBack);
    container.innerHTML = '<p class="text-center">Загрузка профиля...</p>';

    try {
      const response = await fetch(urls.getUserInfo(this.userId));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      if (data?.error || !data?.response?.[0]) {
        throw new Error('Пользователь не найден');
      }

      new ProductComponent(container).render(data.response[0]);
    } catch (err) {
      container.innerHTML = `<p class="text-danger"> ${err.message}</p>`;
    }
  }
}