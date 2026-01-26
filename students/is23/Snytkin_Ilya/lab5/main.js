// main.js
import { Router } from "./router.js";

const app = document.getElementById('app');
const router = new Router(app);
router.navigateToMain(); // ← запуск главной страницы