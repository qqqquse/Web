// pages/UserPage.js
import { ProductComponent } from "../components/ProductComponent.js";
import { BackButtonComponent } from "../components/BackButtonComponent.js";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";

export class UserPage {
  constructor(parent, userId, onBack) {
    this.parent = parent;
    this.userId = userId;
    this.onBack = onBack;
  }

  render() {
    this.parent.innerHTML = '<div class="container mt-4" id="user-container"></div>';
    const container = this.parent.querySelector('#user-container');

    ajax.get(urls.getUserInfo(this.userId), (data) => {
      if (data?.error || !data?.response?.[0]) {
        container.innerHTML = '<p class="text-danger">Не удалось загрузить профиль</p>';
        return;
      }
      new ProductComponent(container).render(data.response[0]);
      new BackButtonComponent(container).render(this.onBack); 
    });
  }
}