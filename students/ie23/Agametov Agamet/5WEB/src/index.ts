import { MainPage } from './pages/MainPage.js';
import { UserPage } from './pages/UserPage.js';

class App {
  private root: HTMLElement;

  constructor() {
    this.root = document.getElementById('app')!;
    this.showMainPage();
  }

  private showMainPage(): void {
    const mainPage = new MainPage({
      parent: this.root,
      onUserClick: (userId) => this.showUserPage(userId)
    });
    mainPage.render();
  }

  private showUserPage(userId: number): void {
    const userPage = new UserPage({
      parent: this.root,
      userId,
      onBack: () => this.showMainPage()
    });
    userPage.render();
  }
}

new App();