// pages/MainPage.js
import { SortFilterComponent } from "../components/SortFilterComponent.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";
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
        <h2>Участники группы</h2>
        <div id="filter"></div>
        <div id="members" class="row row-cols-1 row-cols-md-3 g-4"></div>
      </div>
    `;

    const filterEl = this.parent.querySelector('#filter');
    const membersEl = this.parent.querySelector('#members');

    new SortFilterComponent(filterEl, async (filter) => {
      this.currentFilter = filter;
      await this.loadMembers(membersEl);
    }).render();

    this.loadMembers(membersEl);
  }

  async loadMembers(container) {
    container.innerHTML = '<p class="text-center">Загрузка...</p>';

    try {
      const response = await fetch(urls.getGroupMembers(groupId, this.currentFilter));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.error_msg || 'Ошибка API');

      this.renderUsers(container, data.response.items);
    } catch (err) {
      container.innerHTML = `<p class="text-danger">❌ Ошибка: ${err.message}</p>`;
    }
  }

// pages/MainPage.js
async renderUsers(container, items) {
  container.innerHTML = '';
  if (!items?.length) {
    container.innerHTML = '<p class="text-muted">Участники не найдены.</p>';
    return;
  }

  for (const item of items) {
    // Определяем userID и роль в зависимости от формата
    let userId, role;
    if (typeof item === 'number') {
      userId = item; // filter=unsure → [123, 456]
    } else if (typeof item === 'object') {
      userId = item.id; // filter=managers → [{id:123, role:'admin'}]
      role = item.role;
    } else {
      continue;
    }

    try {
      const res = await fetch(urls.getUserInfo(userId));
      if (!res.ok) continue;
      const data = await res.json();
      if (data.response?.[0]) {
        const user = data.response[0];
        if (role) user.role = role; // добавляем роль, если есть
        new ProductCardComponent(container).render(user, () => {
          this.onUserClick(user.id);
        });
      }
    } catch (err) {
      console.warn('Ошибка загрузки пользователя', userId);
    }
  }
}
}