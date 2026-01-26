export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button class="btn btn-outline-secondary mb-4" id="backButton">
                ← Вернуться к списку пород
            </button>
        `;
    }

    addListeners(onClick) {
        const btn = this.parent.querySelector('#backButton');
        if (btn) {
            btn.addEventListener('click', onClick);
        }
    }

    render(onClick) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(onClick);
    }
}