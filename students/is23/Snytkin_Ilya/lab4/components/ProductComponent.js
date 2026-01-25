export class ProductComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(user) {
    const imgSrc = user.photo_400 || 'https://vk.com/images/camera_400.png';
    const city = user.city?.title || '—';
    const phone = user.mobile_phone || '—';
    const sex = user.sex === 1 ? 'Женский' : user.sex === 2 ? 'Мужской' : '—';
    const lastSeen = user.last_seen?.time
      ? new Date(user.last_seen.time * 1000).toLocaleString('ru-RU')
      : 'Скрыт';

    const div = document.createElement('div');
    div.className = 'card mb-3';
    div.style.maxWidth = '540px';
    div.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${imgSrc}" class="img-fluid rounded-start" alt="Аватар" onerror="this.src='https://vk.com/images/camera_400.png'">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4>${user.first_name} ${user.last_name}</h4>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Пол:</strong> ${sex}</p>
            <p><strong>Город:</strong> ${city}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Последний онлайн:</strong> ${lastSeen}</p>
          </div>
        </div>
      </div>
    `;
    this.parent.appendChild(div);
  }
}