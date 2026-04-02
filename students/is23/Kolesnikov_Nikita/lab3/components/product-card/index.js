export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card h-150" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button 
                        class="btn btn-primary mt-auto" 
                        id="click-card-${data.id}" 
                        data-id ="${data.id}"
                        data-src="${data.src}"
                        data-title="${data.title}">Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
    document
        .getElementById(`click-card-${data.id}`)
        .addEventListener("click", listener)
    }


    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener)
    }
}