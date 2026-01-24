// pages/HomePage.js - ОБНОВЛЕН ДЛЯ РАБОТЫ С НАШИМ API И CRUD
import { fetchApi } from "../modules/fetchApi.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";
import { ApiService } from "../modules/api.js"; // Импортируем наш сервис

export class HomePage {
    constructor(parent, clickCardCallback) {
        this.parent = parent;
        this.pageRoot = null;
        this.clickCard = clickCardCallback;
        this.currentSort = 'id_asc';
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onAddUserClick = this.onAddUserClick.bind(this);
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
                <h1 class="display-5">👥 Участники сообщества</h1>
                <p class="lead">Работа с API через fetch + наш собственный бэкенд</p>
                <div class="alert alert-success">
                    <strong>Лабораторная работа 5:</strong> Используем fetch API для работы с нашим собственным сервером
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('afterbegin', headerHTML);
    }

    renderSortFilter() {
        const filterHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Фильтр и сортировка</h5>
                    <div class="row">
                        <div class="col-md-8">
                            <label for="sort-select" class="form-label">Сортировать по:</label>
                            <select class="form-select" id="sort-select">
                                <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>ID (по возрастанию)</option>
                                <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>ID (по убыванию)</option>
                                <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>Дате добавления (старые)</option>
                                <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>Дате добавления (новые)</option>
                            </select>
                        </div>
                        <div class="col-md-4 d-flex align-items-end">
                            <button class="btn btn-outline-secondary w-100" id="refresh-btn">
                                <i class="bi bi-arrow-clockwise"></i> Обновить
                            </button>
                        </div>
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
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Управление пользователями</h5>
                    <p class="card-text">Добавьте нового участника в сообщество</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success" id="add-user-btn">
                            <i class="bi bi-person-plus"></i> Добавить участника
                        </button>
                        <button class="btn btn-outline-info" id="api-test-btn">
                            <i class="bi bi-plug"></i> Проверить API
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const filterElement = document.getElementById('sort-select');
        if (filterElement && filterElement.closest('.card')) {
            filterElement.closest('.card').insertAdjacentHTML('afterend', addButtonHTML);
            
            document.getElementById('add-user-btn').addEventListener('click', this.onAddUserClick);
            document.getElementById('api-test-btn').addEventListener('click', () => {
                this.testApiConnection();
            });
        }
    }

    async onDeleteClick(event) {
        const userId = event.target.dataset.id || event.target.closest('[data-id]')?.dataset.id;
        if (!userId) return;
        
        if (confirm(`Вы уверены, что хотите удалить пользователя с ID ${userId}?`)) {
            console.log('🗑️ Удаление пользователя ID:', userId);
            
            try {
                await fetchApi.deleteUser(userId);
                
                // Удаляем карточку из DOM
                const cardElement = event.target.closest('.col');
                if (cardElement) {
                    cardElement.remove();
                }
                
                // Показываем уведомление
                this.showNotification('Пользователь успешно удален!', 'success');
                
                // Обновляем список через секунду
                setTimeout(() => {
                    this.getData();
                }, 1000);
                
            } catch (error) {
                console.error('❌ Ошибка удаления:', error);
                this.showNotification(`Ошибка удаления: ${error.message}`, 'danger');
            }
        }
    }

    async onAddUserClick() {
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
                                               placeholder="Введите имя" autocomplete="off">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="last_name" class="form-label">Фамилия <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="last_name" required 
                                               placeholder="Введите фамилию" autocomplete="off">
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
                                               placeholder="Например: Москва" autocomplete="off">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="bdate" class="form-label">Дата рождения</label>
                                        <input type="text" class="form-control" id="bdate" 
                                               placeholder="ДД.ММ.ГГГГ" autocomplete="off">
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
                                               placeholder="Например: ivanov" autocomplete="off">
                                    </div>
                                </div>
                                
                                <div class="alert alert-info">
                                    <small>
                                        <strong>Лабораторная работа 5:</strong> Данные будут отправлены на наш сервер 
                                        через fetch API и сохранены в базе данных.
                                    </small>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveUserBtn">
                                <i class="bi bi-send"></i> Отправить через fetch
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
        document.getElementById('saveUserBtn').onclick = async () => {
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
            
            console.log('➕ Отправка данных через fetch:', userData);
            
            try {
                // Используем fetchApi для отправки данных
                const result = await fetchApi.addUser(userData);
                
                console.log('✅ Ответ сервера:', result);
                
                modal.hide();
                document.getElementById('addUserModal').remove();
                
                // Обновляем список
                await this.getData();
                
                this.showNotification('Пользователь успешно добавлен через fetch API!', 'success');
                
            } catch (error) {
                console.error('❌ Ошибка добавления через fetch:', error);
                this.showNotification(`Ошибка: ${error.message}`, 'danger');
            }
        };
        
        // Автозакрытие при клике вне модалки
        document.getElementById('addUserModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('addUserModal').remove();
        });
    }

    async getData() {
        console.log('🔄 Загрузка данных с нашего API через fetch...');
        
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
                    <p class="mt-2">Загрузка данных через fetch API...</p>
                </div>
            </div>
        `;
        
        try {
            // Используем fetchApi для получения данных
            const data = await fetchApi.getGroupMembers(null, this.currentSort);
            console.log('📦 Получены данные через fetch:', data);
            
            // Очищаем индикатор загрузки
            cardsContainer.innerHTML = '';
            
            const items = data?.items || [];
            
            if (items.length === 0) {
                cardsContainer.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-warning">
                            <h5>Нет участников</h5>
                            <p>В базе данных пока нет пользователей.</p>
                            <p class="mb-0">Добавьте первого участника, используя кнопку "Добавить участника"</p>
                        </div>
                    </div>
                `;
            } else {
                // Рендерим карточки
                this.renderData(items, cardsContainer);
            }
            
            // Обновляем счетчик
            this.updateCounter(items.length);
            
        } catch (error) {
            console.error('❌ Ошибка загрузки через fetch:', error);
            cardsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <h5>Ошибка загрузки данных</h5>
                        <p>${error.message}</p>
                        <p class="mb-0">Убедитесь, что сервер запущен на localhost:8000</p>
                    </div>
                </div>
            `;
        }
    }

    renderData(items, container) {
        console.log('📊 Рендер данных через fetch, количество:', items.length);
        
        items.forEach((item) => {
            const col = document.createElement('div');
            col.className = 'col';
            container.appendChild(col);
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard, this.onDeleteClick);
        });
    }

    updateCounter(count) {
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
                        <strong>Всего участников:</strong> ${count}
                        <span class="ms-3"><strong>Сортировка:</strong> ${this.getSortLabel(this.currentSort)}</span>
                        <span class="ms-3"><strong>Технология:</strong> Fetch API + наш сервер</span>
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

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 400px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    async testApiConnection() {
        try {
            const response = await fetch('http://localhost:8000/health');
            if (response.ok) {
                const data = await response.json();
                this.showNotification(`✅ API работает: ${data.message}`, 'success');
            } else {
                this.showNotification('❌ API не отвечает', 'danger');
            }
        } catch (error) {
            this.showNotification(`❌ Ошибка соединения: ${error.message}`, 'danger');
        }
    }

    getHTML() {
        return `
            <div id="home-page-root" class="container mt-4">
                <!-- Контент будет добавляться динамически -->
            </div>
        `;
    }
}