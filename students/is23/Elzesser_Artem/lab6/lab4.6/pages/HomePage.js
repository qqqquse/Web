// pages/HomePage.js - ПОЛНОСТЬЮ ОБНОВЛЕН ДЛЯ РАБОТЫ С НАШИМ API
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";

export class HomePage {
    constructor(parent, clickCardCallback) {
        this.parent = parent;
        this.pageRoot = null;
        this.clickCard = clickCardCallback;
        this.currentSort = 'id_asc';
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onAddUserClick = this.onAddUserClick.bind(this);
        this.users = [];
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('home-page-root');
        if (!this.pageRoot) return;

        this.renderHeader();
        this.renderSortFilter();
        this.renderAddButton();
        this.getData();
    }

    renderHeader() {
        const headerHTML = `
            <div class="mb-4">
                <h1>👥 Участники сообщества</h1>
                <p class="lead">Список участников с возможностью сортировки, добавления и удаления</p>
                <div class="alert alert-info">
                    <strong>Внимание:</strong> Теперь работаем с нашим собственным API вместо VK API
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('afterbegin', headerHTML);
    }

    renderSortFilter() {
        const filterHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <label for="sort-select" class="form-label"><strong>Сортировать участников:</strong></label>
                    <div class="d-flex gap-2">
                        <select class="form-select" id="sort-select">
                            <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>ID (по возрастанию)</option>
                            <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>ID (по убыванию)</option>
                            <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>Дате добавления (старые)</option>
                            <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>Дате добавления (новые)</option>
                        </select>
                        <button class="btn btn-outline-secondary" id="refresh-btn" title="Обновить список">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const header = this.pageRoot.querySelector('h1');
        if (header && header.parentElement) {
            header.parentElement.insertAdjacentHTML('afterend', filterHTML);
        }

        const select = document.getElementById('sort-select');
        select.addEventListener('change', (event) => {
            this.currentSort = event.target.value;
            this.getData();
        });

        const refreshBtn = document.getElementById('refresh-btn');
        refreshBtn.addEventListener('click', () => {
            this.getData();
        });
    }

    renderAddButton() {
        const addButtonHTML = `
            <div class="mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Добавить нового участника</h5>
                        <p class="card-text">Добавьте нового участника в сообщество</p>
                        <button class="btn btn-success" id="add-user-btn">
                            <i class="bi bi-person-plus"></i> Добавить участника
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const filterElement = document.getElementById('sort-select');
        if (filterElement && filterElement.closest('.card')) {
            filterElement.closest('.card').insertAdjacentHTML('afterend', addButtonHTML);
            
            const addBtn = document.getElementById('add-user-btn');
            addBtn.addEventListener('click', this.onAddUserClick);
        }
    }

    onDeleteClick(event) {
        const userId = event.target.dataset.id || event.target.closest('[data-id]')?.dataset.id;
        if (!userId) return;
        
        if (confirm(`Вы уверены, что хотите удалить пользователя с ID ${userId}?`)) {
            console.log('🗑️ Удаление пользователя ID:', userId);
            
            // Используем наш ajax для удаления
            ajax.post(urls.deleteUser(userId), (data) => {
                if (data.error) {
                    console.error('❌ Ошибка удаления:', data.error);
                    alert(`Ошибка удаления: ${data.error.error_msg}`);
                } else {
                    console.log('✅ Пользователь удален:', data);
                    
                    // Удаляем карточку из DOM
                    const cardElement = event.target.closest('.col');
                    if (cardElement) {
                        cardElement.remove();
                    }
                    
                    // Обновляем счетчик
                    this.updateCounter();
                    
                    alert('Пользователь успешно удален!');
                }
            });
        }
    }

    onAddUserClick() {
        const formHtml = `
            <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addUserModalLabel">Добавить нового участника</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addUserForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="first_name" class="form-label">Имя <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="first_name" required 
                                               placeholder="Введите имя">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="last_name" class="form-label">Фамилия <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="last_name" required 
                                               placeholder="Введите фамилию">
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="photo_400_orig" class="form-label">Фотография (URL)</label>
                                    <input type="url" class="form-control" id="photo_400_orig" 
                                           value="https://via.placeholder.com/400x400/6c757d/ffffff?text=User"
                                           placeholder="https://example.com/photo.jpg">
                                    <div class="form-text">Укажите URL изображения или оставьте стандартное</div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="city" class="form-label">Город</label>
                                        <input type="text" class="form-control" id="city" 
                                               placeholder="Например: Москва">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="bdate" class="form-label">Дата рождения</label>
                                        <input type="text" class="form-control" id="bdate" 
                                               placeholder="ДД.ММ.ГГГГ">
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="sex" class="form-label">Пол</label>
                                        <select class="form-select" id="sex">
                                            <option value="0">Не указан</option>
                                            <option value="2">Мужской</option>
                                            <option value="1">Женский</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="domain" class="form-label">Домен (никнейм)</label>
                                        <input type="text" class="form-control" id="domain" 
                                               placeholder="Например: ivanov">
                                    </div>
                                </div>
                                
                                <div class="alert alert-info">
                                    <small>
                                        <strong>Примечание:</strong> Поля отмеченные * обязательны для заполнения.
                                        Данные будут сохранены в нашем собственном API.
                                    </small>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveUserBtn">
                                <i class="bi bi-save"></i> Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Удаляем старую модалку если есть
        const oldModal = document.getElementById('addUserModal');
        if (oldModal) oldModal.remove();
        
        document.body.insertAdjacentHTML('beforeend', formHtml);
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        modal.show();
        
        // Обработчик сохранения
        document.getElementById('saveUserBtn').onclick = () => {
            const first_name = document.getElementById('first_name').value.trim();
            const last_name = document.getElementById('last_name').value.trim();
            const photo_400_orig = document.getElementById('photo_400_orig').value.trim();
            const city = document.getElementById('city').value.trim();
            const bdate = document.getElementById('bdate').value.trim();
            const sex = parseInt(document.getElementById('sex').value);
            const domain = document.getElementById('domain').value.trim();
            
            if (!first_name || !last_name) {
                alert('Пожалуйста, заполните обязательные поля: Имя и Фамилия');
                return;
            }
            
            const userData = {
                first_name,
                last_name,
                photo_400_orig: photo_400_orig || 'https://via.placeholder.com/400x400/6c757d/ffffff?text=User',
                sex
            };
            
            if (city) {
                userData.city = {
                    id: 1,
                    title: city
                };
            }
            
            if (bdate) userData.bdate = bdate;
            if (domain) userData.domain = domain;
            
            console.log('➕ Добавление пользователя:', userData);
            
            // Отправляем POST запрос через наш ajax
            fetch(urls.addUser(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error.error_msg);
                }
                
                console.log('✅ Пользователь добавлен:', data);
                modal.hide();
                document.getElementById('addUserModal').remove();
                
                // Обновляем список
                this.getData();
                
                alert('Пользователь успешно добавлен!');
            })
            .catch(error => {
                console.error('❌ Ошибка добавления:', error);
                alert(`Ошибка при добавлении пользователя: ${error.message}`);
            });
        };
        
        // Автозакрытие при клике вне модалки
        document.getElementById('addUserModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('addUserModal').remove();
        });
    }

    getData() {
        console.log('🔄 Загрузка данных с нашего API...');
        
        // Удаляем старый контейнер
        const oldContainer = document.getElementById('cards-container');
        if (oldContainer) oldContainer.remove();
        
        // Создаем новый контейнер
        const cardsContainer = document.createElement('div');
        cardsContainer.id = 'cards-container';
        cardsContainer.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5';
        this.pageRoot.appendChild(cardsContainer);
        
        // Показываем индикатор загрузки
        cardsContainer.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <p class="mt-2">Загрузка данных...</p>
                </div>
            </div>
        `;
        
        // Запрашиваем данные
        ajax.post(urls.getGroupMembers(null, this.currentSort), (data) => {
            console.log('📦 Получен ответ:', data);
            
            // Очищаем индикатор загрузки
            cardsContainer.innerHTML = '';
            
            if (data.error) {
                // Ошибка API
                cardsContainer.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-danger">
                            <h5>Ошибка загрузки данных</h5>
                            <p>${data.error.error_msg}</p>
                            <p class="mb-0">Убедитесь, что сервер запущен на localhost:8000</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            // Извлекаем данные в зависимости от формата
            let items = [];
            if (data.response && data.response.items) {
                // Формат: {response: {count: X, items: [...]}}
                items = data.response.items;
                this.users = items;
            } else if (data.response && Array.isArray(data.response)) {
                // Формат: {response: [...]}
                items = data.response;
                this.users = items;
            } else if (Array.isArray(data)) {
                // Формат: [...]
                items = data;
                this.users = items;
            }
            
            console.log(`👥 Найдено участников: ${items.length}`);
            
            if (items.length === 0) {
                // Нет данных
                cardsContainer.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-warning">
                            <h5>Нет участников</h5>
                            <p>В сообществе пока нет участников.</p>
                            <p class="mb-0">Добавьте первого участника, используя кнопку "Добавить участника"</p>
                        </div>
                    </div>
                `;
            } else {
                // Рендерим карточки
                this.renderData(items, cardsContainer);
            }
            
            // Обновляем счетчик
            this.updateCounter();
        });
    }

    renderData(items, container) {
        console.log('📊 Рендер данных, количество:', items.length);
        
        items.forEach((item) => {
            const col = document.createElement('div');
            col.className = 'col';
            container.appendChild(col);
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard, this.onDeleteClick);
        });
    }

    updateCounter() {
        // Обновляем счетчик участников
        let counterElement = document.getElementById('users-counter');
        if (!counterElement) {
            // Создаем элемент счетчика если его нет
            const headerElement = this.pageRoot.querySelector('h1');
            if (headerElement) {
                counterElement = document.createElement('div');
                counterElement.id = 'users-counter';
                counterElement.className = 'alert alert-light border mb-4';
                headerElement.parentNode.insertBefore(counterElement, headerElement.nextSibling);
            }
        }
        
        if (counterElement) {
            counterElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Всего участников:</strong> ${this.users.length}
                        ${this.currentSort ? `<span class="ms-3"><strong>Сортировка:</strong> ${this.getSortLabel(this.currentSort)}</span>` : ''}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Обновить
                        </button>
                    </div>
                </div>
            `;
        }
    }

    getSortLabel(sortValue) {
        const labels = {
            'id_asc': 'ID (по возрастанию)',
            'id_desc': 'ID (по убыванию)',
            'time_asc': 'Дате добавления (старые)',
            'time_desc': 'Дате добавления (новые)'
        };
        return labels[sortValue] || sortValue;
    }

    getHTML() {
        return `
            <div id="home-page-root" class="container mt-4">
                <!-- Контент будет добавляться динамически -->
            </div>
        `;
    }
}