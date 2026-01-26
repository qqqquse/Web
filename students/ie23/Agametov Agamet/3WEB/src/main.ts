import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root') as HTMLElement;

if (root) {
    const mainPage = new MainPage(root);
    mainPage.render();
} else {
    console.error('Root element not found');
}