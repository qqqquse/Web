// router.js
import { MainPage } from "../pages/MainPage.js";
import { UserPage } from "../pages/UserPage.js";

export class Router {
  constructor(root) {
    this.root = root;
  }

  navigateToMain() {
    this.root.innerHTML = '';
    new MainPage(this.root, (id) => this.navigateToUser(id)).render();
  }

  async navigateToUser(userId) {
    this.root.innerHTML = '';
    const page = new UserPage(this.root, userId, () => this.navigateToMain());
    await page.render();
  }
}