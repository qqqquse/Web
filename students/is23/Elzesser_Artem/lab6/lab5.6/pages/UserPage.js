// pages/UserPage.js - ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ ФАЙЛ
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { ProductComponent } from "../components/ProductComponent.js";
import { BackButtonComponent } from "../components/BackButtonComponent.js";

export class UserPage {
    constructor(parent, userId, clickBackCallback) {
        this.parent = parent;
        this.userId = userId;
        this.clickBack = clickBackCallback;
        this.pageRoot = null;
        
        console.log('📄 UserPage создана для userId:', this.userId);
    }

    // Основной метод рендеринга
    render() {
        console.log('🔄 Рендер UserPage для ID:', this.userId);
        
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('user-page-root');

        // 1. Кнопка "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack);
        
        // 2. Загрузка данных пользователя
        this.getData();
    }

    // Получение данных пользователя
    getData() {
        console.log('🔍 Запрашиваю данные для userId:', this.userId);
        
        // Проверка наличия userId
        if (!this.userId) {
            console.error('❌ ОШИБКА: userId не указан!');
            this.showError('ID пользователя не указан');
            return;
        }
        
        const url = urls.getUserInfo(this.userId);
        console.log('📡 URL запроса:', url.substring(0, 100) + '...');
        
        ajax.post(url, (data) => {
            console.log('📦 Получен ответ от API:', data);
            this.renderData(data);
        });
    }

    // Рендер данных пользователя
    renderData(data) {
        console.log('🎨 Рендер данных пользователя:', data);
        
        // VK API для users.get возвращает МАССИВ: [{...}]
        let userData;
        
        if (Array.isArray(data)) {
            // Формат: users.get → [{...}]
            userData = data[0];
        } else if (data && typeof data === 'object') {
            // Формат: уже распакованный объект
            userData = data;
        } else {
            console.error('❌ Неизвестный формат данных:', data);
            this.showError('Неверный формат данных пользователя');
            return;
        }
        
        if (!userData) {
            console.error('❌ Нет данных о пользователе');
            this.showError('Пользователь не найден');
            return;
        }
        
        console.log('👤 Данные пользователя:', userData.first_name, userData.last_name);
        
        const product = new ProductComponent(this.pageRoot);
        product.render(userData);
    }

    // Показать ошибку
    showError(message) {
        this.pageRoot.innerHTML += `
            <div class="alert alert-danger mt-3">
                <h5>Ошибка</h5>
                <p>${message}</p>
                <p>ID пользователя: ${this.userId || 'не указан'}</p>
            </div>
        `;
    }

    // HTML шаблон страницы
    getHTML() {
        return `
            <div id="user-page-root" class="container mt-4">
                <h2 class="mb-4">Профиль пользователя</h2>
                <div id="user-content">
                    <div class="alert alert-info">
                        Загрузка данных пользователя...
                    </div>
                </div>
            </div>
        `;
    }
}