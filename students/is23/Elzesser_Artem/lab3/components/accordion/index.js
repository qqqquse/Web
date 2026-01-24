export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="accordion mt-4" id="dogAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseOne" aria-expanded="true">
                            🐕 Популярные породы собак
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" 
                         data-bs-parent="#dogAccordion">
                        <div class="accordion-body">
                            <strong>Лабрадор-ретривер</strong> - дружелюбная, энергичная порода, 
                            отлично подходит для семьи с детьми.
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                            🏥 Уход и здоровье
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" 
                         data-bs-parent="#dogAccordion">
                        <div class="accordion-body">
                            Регулярные прогулки, правильное питание и ветеринарные осмотры - 
                            залог здоровья вашей собаки.
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#collapseThree">
                            🎓 Дрессировка и воспитание
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" 
                         data-bs-parent="#dogAccordion">
                        <div class="accordion-body">
                            Начинайте дрессировку с 3-4 месяцев. Используйте положительное 
                            подкрепление и будьте последовательны.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}