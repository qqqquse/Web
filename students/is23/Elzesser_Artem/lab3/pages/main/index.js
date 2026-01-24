import { ProductCardComponent } from '../../components/product-card/index.js';
import { AccordionComponent } from '../../components/accordion/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.onCardClick = this.onCardClick.bind(this);
    }

    getData() {
        return [
            {
                id: 1,
                breed: "Лабрадор-ретривер",
                description: "Дружелюбная, энергичная порода. Идеальна для семей.",
                image: "img/images.jpg"
            },
            {
                id: 2,
                breed: "Немецкая овчарка",
                description: "Умная, преданная, отличный сторож и компаньон.",
                image: "img/images2.jpg"
            },
            {
                id: 3,
                breed: "Бигль",
                description: "Весёлый, любопытный, с прекрасным нюхом.",
                image: "img/bigl-opisanie.jpg"
            },
            {
                id: 4,
                breed: "Золотистый ретривер",
                description: "Добродушная, терпеливая, любит воду.",
                image: "img/retr1.jpg"
            }
        ];
    }

    onCardClick(event) {
        const cardId = event.target.dataset.id;
        window.history.pushState({ page: 'product', id: cardId }, '', `#product-${cardId}`);
        window.dispatchEvent(new Event('popstate'));
    }

    render() {
        this.parent.innerHTML = '';
        
        // Заголовок
        this.parent.insertAdjacentHTML('beforeend', `
            <h1 class="mb-4">🐶 Питомник "Весёлый хвост"</h1>
            <p class="lead mb-4">Выберите породу собаки для получения подробной информации</p>
        `);
        
        // Контейнер для карточек
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5';
        cardsContainer.id = 'cards-container';
        this.parent.appendChild(cardsContainer);
        
        // Отрисовываем карточки
        const data = this.getData();
        data.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col';
            cardsContainer.appendChild(col);
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.onCardClick);
        });
        
        // Добавляем аккордеон
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'mt-5';
        this.parent.appendChild(accordionContainer);
        
        const accordion = new AccordionComponent(accordionContainer);
        accordion.render();
    }
}