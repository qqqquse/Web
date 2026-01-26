import { BackButtonComponent } from '../../components/back-button/index.js';
import { ApiService } from '../../api.js'; // Импортируем ApiService

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.onBackClick = this.onBackClick.bind(this);
        this.data = null; // Будем хранить данные о собаке
    }

    // Заменяем локальный getData на загрузку с сервера
    async loadData() {
        try {
            this.data = await ApiService.getDogById(this.id);
            if (!this.data) {
                // Если собака не найдена, используем заглушку
                this.data = {
                    id: this.id,
                    breed: "Порода не найдена",
                    description: "Информация о данной породе отсутствует в базе данных",
                    fullInfo: `<p>Пожалуйста, выберите другую породу из списка</p>`,
                    image: "img/default-dog.jpg"
                };
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.data = {
                id: this.id,
                breed: "Ошибка загрузки",
                description: "Не удалось загрузить информацию о породе",
                fullInfo: `<p>Попробуйте обновить страницу или выбрать другую породу</p>`,
                image: "img/default-dog.jpg"
            };
        }
    }

    onBackClick() {
        window.history.pushState({ page: 'main' }, '', '/');
        window.dispatchEvent(new Event('popstate'));
    }

    async render() {
        // Загружаем данные с сервера
        await this.loadData();
        
        this.parent.innerHTML = '';
        
        // Кнопка назад
        const backButtonContainer = document.createElement('div');
        this.parent.appendChild(backButtonContainer);
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.onBackClick);
        
        // Детальная информация о собаке
        this.parent.insertAdjacentHTML('beforeend', `
            <div class="row mt-4">
                <div class="col-md-6">
                    <img src="${this.data.image}" class="img-fluid rounded shadow" 
                         alt="${this.data.breed}" style="max-height: 400px; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <h2>${this.data.breed}</h2>
                    <p class="lead">${this.data.description}</p>
                    <div class="mt-4">
                        ${this.data.fullInfo || '<p>Дополнительная информация отсутствует</p>'}
                    </div>
                    <div class="mt-4">
                        <button class="btn btn-success">Забронировать щенка</button>
                        <button class="btn btn-outline-primary ms-2">Задать вопрос</button>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info mt-5">
                <h5>ℹ️ Контактная информация</h5>
                <p>Телефон: +7 (XXX) XXX-XX-XX<br>
                Адрес питомника: г. Москва, ул. Собачья, д. 5<br>
                Часы работы: ежедневно с 10:00 до 19:00</p>
            </div>
        `);
    }
}