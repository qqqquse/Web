// pages/UserPage.js
import { fetchApi } from "../modules/fetchApi.js";
import { ProductComponent } from "../components/ProductComponent.js";
import { BackButtonComponent } from "../components/BackButtonComponent.js";

export class UserPage {
    constructor(parent, userId, clickBackCallback) {
        this.parent = parent;
        this.userId = userId;
        this.clickBack = clickBackCallback;
        this.pageRoot = null;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('user-page-root');

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack);
        
        this.getData();
    }

    async getData() {
        try {
            const data = await fetchApi.getUserInfo(this.userId);
            this.renderData(data);
        } catch (error) {
            console.error('Error loading user info:', error);
            const contentContainer = document.getElementById('user-content') || this.pageRoot;
            contentContainer.innerHTML = `<div class="alert alert-danger">Ошибка загрузки: ${error.message}</div>`;
        }
    }

    renderData(data) {
        const user = Array.isArray(data) ? data[0] : data;
        const product = new ProductComponent(this.pageRoot);
        product.render(user);
    }

    getHTML() {
        return `<div id="user-page-root" class="container mt-4"></div>`;
    }
}