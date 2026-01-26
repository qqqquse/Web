// components/BackButtonComponent.js
export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(clickCallback) {
        // Создаем кнопку "Назад"
        const buttonHTML = `
            <button class="btn btn-secondary mb-3" id="back-button">
                ← Назад к списку
            </button>
        `;
        
        this.parent.insertAdjacentHTML('afterbegin', buttonHTML);
        
        // Навешиваем обработчик события
        const button = document.getElementById('back-button');
        if (button && clickCallback) {
            button.addEventListener('click', clickCallback);
        }
    }
}