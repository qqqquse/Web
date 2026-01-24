import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';

class App {
    constructor() {
        this.root = document.getElementById('root');
        this.initRouter();
        this.render();
    }

    initRouter() {
        // Обработчик изменения URL
        window.addEventListener('popstate', (event) => {
            this.render();
        });
        
        // Обработчик загрузки страницы
        window.addEventListener('load', () => {
            this.render();
        });
    }

    getCurrentPage() {
        const hash = window.location.hash; // Например: #product-1
        const path = window.location.pathname;
        
        if (hash.startsWith('#product-')) {
            const id = hash.split('-')[1];
            return { type: 'product', id: parseInt(id) };
        }
        
        return { type: 'main' };
    }

    render() {
        const page = this.getCurrentPage();
        
        switch (page.type) {
            case 'product':
                const productPage = new ProductPage(this.root, page.id);
                productPage.render();
                break;
                
            case 'main':
            default:
                const mainPage = new MainPage(this.root);
                mainPage.render();
                break;
        }
    }
}

// Запускаем приложение
new App();