// pages/MainPage.js
import { SortFilterComponent } from "../components/SortFilterComponent.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { groupId } from "../modules/consts.js";

export class MainPage {
  constructor(parent, onUserClick) {
    this.parent = parent;
    this.onUserClick = onUserClick;
    this.currentFilter = 'managers';
  }

  render() {
    this.parent.innerHTML = `
      <div class="container mt-4">
        <h2>Администраторы группы</h2>
        <div id="filter"></div>
        <div id="members" class="row row-cols-1 row-cols-md-3 g-4"></div>
      </div>
    `;

    const filterEl = this.parent.querySelector('#filter');
    const membersEl = this.parent.querySelector('#members');

    new SortFilterComponent(filterEl, (filter) => {
      this.currentFilter = filter;
      this.loadMembers(membersEl);
    }).render();

    this.loadMembers(membersEl);
  }

  loadMembers(container) {
    container.innerHTML = '<p class="text-center">Загрузка...</p>';

    ajax.get(urls.getGroupMembers(groupId, this.currentFilter), (data) => {
      if (data.error) {
        container.innerHTML = `<p class="text-danger">Ошибка: ${data.error.error_msg || 'API не отвечает'}</p>`;
        return;
      }

      const users = data.response.items; // [{id, role}, ...]
      this.renderUsers(container, users);
    });
  }

  renderUsers(container, users) {
    container.innerHTML = '';

    if (!users || users.length === 0) {
      container.innerHTML = '<p class="text-muted">Участники не найдены.</p>';
      return;
    }

    users.forEach(user => {
      ajax.get(urls.getUserInfo(user.id), (res) => {
        if (res?.response?.[0]) {
          const fullUser = res.response[0];
          fullUser.role = user.role; // добавляем роль
          new ProductCardComponent(container).render(fullUser, () => {
            this.onUserClick(fullUser.id);
          });
        }
      });
    });
  }
}