import { MainPage } from './pages/MainPage.js';
import { UserPage } from './pages/UserPage.js';
class App {
    constructor() {
        this.root = document.getElementById('app');
        this.showMainPage();
    }
    showMainPage() {
        const mainPage = new MainPage({
            parent: this.root,
            onUserClick: (userId) => this.showUserPage(userId)
        });
        mainPage.render();
    }
    showUserPage(userId) {
        const userPage = new UserPage({
            parent: this.root,
            userId,
            onBack: () => this.showMainPage()
        });
        userPage.render();
    }
}
new App();
