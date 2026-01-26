// main.js - проверка передачи ID
import { HomePage } from './pages/HomePage.js';
import { UserPage } from './pages/UserPage.js';

class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        console.log('🚀 Приложение запущено');
        this.renderHomePage();
    }

    // Главная страница
    renderHomePage() {
        console.log('🏠 Рендер главной страницы');
        const homePage = new HomePage(this.appContainer, this.clickCard.bind(this));
        homePage.render();
    }

    // Обработчик клика по карточке - ВАЖНО ПРОВЕРИТЬ ЭТО!
    clickCard(userId) {
        console.log('🖱️ Клик по карточке, userId:', userId);
        console.log('📌 Тип userId:', typeof userId);
        
        // Проверяем что userId - число
        const numericId = Number(userId);
        if (isNaN(numericId)) {
            console.error('❌ ОШИБКА: userId не число:', userId);
            alert('Ошибка: ID пользователя должен быть числом');
            return;
        }
        
        const userPage = new UserPage(this.appContainer, numericId, this.clickBack.bind(this));
        userPage.render();
    }

    // Назад на главную
    clickBack() {
        console.log('🔙 Возврат на главную');
        this.renderHomePage();
    }
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM загружен, запускаю приложение...');
    new App();
});