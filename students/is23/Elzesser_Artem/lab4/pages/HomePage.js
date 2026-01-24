// pages/HomePage.js
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { groupId } from "../modules/consts.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";

export class HomePage {
    constructor(parent, clickCardCallback) {
        this.parent = parent;
        this.pageRoot = null;
        this.clickCard = clickCardCallback;
        this.currentSort = 'id_asc'; // Текущее значение сортировки
    }

    // Основной метод рендеринга страницы
    render() {
        this.parent.innerHTML = ''; // Очищаем контейнер
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Находим корневой элемент страницы для вложенных компонентов
        this.pageRoot = document.getElementById('home-page-root');
        if (!this.pageRoot) return;

        // 1. Рендерим выпадающий список для сортировки (ЗАДАНИЕ ВАРИАНТА 1)
        this.renderSortFilter();
        // 2. Загружаем и отображаем данные
        this.getData();
    }

    // Метод для создания фильтра сортировки
    renderSortFilter() {
        const filterHTML = `
            <div class="mb-4">
                <label for="sort-select" class="form-label">Сортировать участников по:</label>
                <select class="form-select" id="sort-select">
                    <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>ID (по возрастанию)</option>
                    <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>ID (по убыванию)</option>
                    <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>Дате вступления (старые)</option>
                    <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>Дате вступления (новые)</option>
                </select>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('afterbegin', filterHTML);

        // Навешиваем обработчик на изменение select
        const select = document.getElementById('sort-select');
        select.addEventListener('change', (event) => {
            this.currentSort = event.target.value;
            this.getData(); // Перезагружаем данные с новой сортировкой
        });
    }

    // Метод получения данных с API
    getData() {
    console.log('🔄 Загрузка данных...');
    
    // Удаляем старые карточки
    const oldContainer = document.getElementById('cards-container');
    if (oldContainer) oldContainer.remove();
    
    // Создаём новый контейнер
    const cardsContainer = document.createElement('div');
    cardsContainer.id = 'cards-container';
    cardsContainer.className = 'row row-cols-1 row-cols-md-3 g-4';
    this.pageRoot.appendChild(cardsContainer);
    
    // Запрашиваем данные
    ajax.post(urls.getGroupMembers(groupId, this.currentSort), (data) => {
        console.log('📦 Получен ответ:', data);
        
        // Извлекаем items из правильной структуры VK API
        const items = data?.items || data?.response?.items || [];
        console.log(`👥 Найдено участников: ${items.length}`);
        
        if (items.length === 0) {
            // Показываем сообщение если нет данных
            cardsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning">
                        <h5>Нет данных для отображения</h5>
                        <p>Возможные причины:</p>
                        <ul>
                            <li>Токен VK API невалиден</li>
                            <li>Группа не найдена</li>
                            <li>Нет участников в группе</li>
                        </ul>
                        <p>Используются тестовые данные...</p>
                    </div>
                </div>
            `;
            
            // Показываем демо-данные
            this.showDemoData(cardsContainer);
        } else {
            // Отрисовываем реальные данные
            this.renderData(items, cardsContainer);
        }
    });
}

// Добавь этот метод в класс HomePage
showDemoData(container) {
    const demoUsers = [
        {id: 1, first_name: 'Иван', last_name: 'Иванов', photo_400_orig: 'https://via.placeholder.com/400'},
        {id: 2, first_name: 'Мария', last_name: 'Петрова', photo_400_orig: 'https://via.placeholder.com/400'},
        {id: 3, first_name: 'Алексей', last_name: 'Сидоров', photo_400_orig: 'https://via.placeholder.com/400'},
        {id: 4, first_name: 'Елена', last_name: 'Васильева', photo_400_orig: 'https://via.placeholder.com/400'},
        {id: 5, first_name: 'Дмитрий', last_name: 'Кузнецов', photo_400_orig: 'https://via.placeholder.com/400'}
    ];
    
    console.log('🎭 Использую демо-данные для отображения');
    this.renderData(demoUsers, container);
}

    // Метод отрисовки массива карточек
    renderData(items, container) {
    console.log('📊 Рендер данных, количество:', items.length);
    
    items.forEach((item, index) => {
        console.log(`👤 [${index}] Пользователь:`, {
            id: item.id,
            name: `${item.first_name} ${item.last_name}`,
            hasPhoto: !!item.photo_400_orig
        });
        
        const productCard = new ProductCardComponent(container);
        productCard.render(item, this.clickCard.bind(this));
    });
}

    getHTML() {
        return `<div id="home-page-root" class="container mt-4"></div>`;
    }
}