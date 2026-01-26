export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${data.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse-${data.id}" 
                            aria-expanded="false" 
                            aria-controls="collapse-${data.id}">
                        🐕 ${data.title}
                    </button>
                </h2>
                <div id="collapse-${data.id}" 
                     class="accordion-collapse collapse" 
                     aria-labelledby="heading-${data.id}" 
                     data-bs-parent="#dogsAccordion">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${data.src}" 
                                     class="img-fluid rounded" 
                                     alt="${data.title}">
                            </div>
                            <div class="col-md-8">
                                <h5>${data.title}</h5>
                                <p>${data.text}</p>
                                ${data.breed ? `<p><strong>Порода:</strong> ${data.breed}</p>` : ''}
                                ${data.age ? `<p><strong>Возраст:</strong> ${data.age} лет</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
