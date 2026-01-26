// router.js
import { MainPage } from "./Pages/MainPage.js";
import { UserPage } from "./Pages/UserPage.js";

export class Router {
  constructor(rootElement) {
    this.root = rootElement;
  }

  navigateToMain() {
    this.root.innerHTML = ''; // ← ОБЯЗАТЕЛЬНО!
    const page = new MainPage(this.root, (userId) => {
      this.navigateToUser(userId);
    });
    page.render();
  }

  navigateToUser(userId) {
    this.root.innerHTML = ''; // ← ОБЯЗАТЕЛЬНО!
    const page = new UserPage(this.root, userId, () => {
      this.navigateToMain(); // ← это и есть "назад"
    });
    page.render();
  }
}