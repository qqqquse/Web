export class FilterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="d-flex justify-content-center mb-3">
                <select id="group-filter" class="form-select" style="max-width: 300px;">
                    <option value="">Все</option>
                    <option value="friends">Друзья</option>
                    <option value="managers">Руководители</option>
                    <option value="donut">Донатеры</option>
                    <option value="unsure">Возможно пойдут</option>
                    <option value="unsure_friends">Друзья + возможно пойдут</option>
                    <option value="invites">Приглашённые</option>
                </select>
            </div>
        `;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const select = document.getElementById('group-filter');
        select.addEventListener('change', (e) => {
            listener(e.target.value);
        });
    }
}