// main.js - проверка передачи ID
import { HomePage } from './pages/HomePage.js';
import { UserPage } from './pages/UserPage.js';
import { useMockData } from './modules/consts.js';

class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        // Добавляем информационное сообщение
        this.showInfoMessage();
        
        console.log('🚀 Приложение запущено');
        this.renderHomePage();
    }

    // Показываем информационное сообщение
    showInfoMessage() {
        const infoDiv = document.createElement('div');
        infoDiv.id = 'app-info';
        this.appContainer.appendChild(infoDiv);
        
        if (useMockData) {
            infoDiv.innerHTML = `
                <div class="alert alert-info mt-3">
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle me-3" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        <div>
                            <h5 class="mb-1">📱 Режим демонстрации</h5>
                            <p class="mb-0">Вы работаете с тестовыми данными. Для работы с реальным VK API добавьте токен в файл <code>modules/consts.js</code></p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            infoDiv.innerHTML = `
                <div class="alert alert-success mt-3">
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle me-3" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        <div>
                            <h5 class="mb-1">✅ Подключено к VK API</h5>
                            <p class="mb-0">Вы работаете с реальными данными VK.</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Главная страница
    renderHomePage() {
        console.log('🏠 Рендер главной страницы');
        
        // Удаляем старый контент кроме инфо-сообщения
        const appContent = this.appContainer.querySelectorAll('#app-info ~ *');
        appContent.forEach(el => el.remove());
        
        const homePage = new HomePage(this.appContainer, this.clickCard.bind(this));
        homePage.render();
    }

    // Обработчик клика по карточке
    clickCard(userId) {
        console.log('🖱️ Клик по карточке, userId:', userId);
        
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