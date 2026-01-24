import { BackButtonComponent } from '../../components/back-button/index.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.onBackClick = this.onBackClick.bind(this);
    }

    getData() {
        const allDogs = [
            {
                id: 1,
                breed: "Лабрадор-ретривер",
                description: "Дружелюбная, энергичная порода. Идеальна для семей.",
                fullInfo: `
                    <h5>Характеристики:</h5>
                    <ul>
                        <li><strong>Рост:</strong> 54-57 см (кобели), 51-56 см (суки)</li>
                        <li><strong>Вес:</strong> 27-40 кг</li>
                        <li><strong>Продолжительность жизни:</strong> 10-14 лет</li>
                        <li><strong>Темперамент:</strong> Дружелюбный, активный, общительный</li>
                    </ul>
                    <h5 class="mt-3">Особенности ухода:</h5>
                    <p>Требует регулярных физических нагрузок. Шерсть нужно расчёсывать 1-2 раза в неделю.</p>
                `,
                image: "img/images.jpg"
            },
            {
                id: 2,
                breed: "Немецкая овчарка",
                description: "Умная, преданная, отличный сторож и компаньон.",
                fullInfo: `
                    <h5>Характеристики:</h5>
                    <ul>
                        <li><strong>Рост:</strong> 60-65 см (кобели), 55-60 см (суки)</li>
                        <li><strong>Вес:</strong> 30-40 кг</li>
                        <li><strong>Продолжительность жизни:</strong> 9-13 лет</li>
                        <li><strong>Темперамент:</strong> Умный, преданный, смелый</li>
                    </ul>
                    <h5 class="mt-3">Особенности ухода:</h5>
                    <p>Нуждается в серьёзной дрессировке и больших физических нагрузках.</p>
                `,
                image: "img/images2.jpg"
            },
            {
                id: 3,
                breed: "Бигль",
                description: "Весёлый, любопытный, с прекрасным нюхом.",
                fullInfo: `
                    <h5>Характеристики:</h5>
                    <ul>
                        <li><strong>Рост:</strong> 33-40 см</li>
                        <li><strong>Вес:</strong> 8-14 кг</li>
                        <li><strong>Продолжительность жизни:</strong> 12-15 лет</li>
                        <li><strong>Темперамент:</strong> Дружелюбный, любопытный, энергичный</li>
                    </ul>
                    <h5 class="mt-3">Особенности ухода:</h5>
                    <p>Любит долгие прогулки. Склонен к побегам, нужен надежный поводок.</p>
                `,
                image: "img/bigl-opisanie.jpg"
            },
            {
                id: 4,
                breed: "Золотистый ретривер",
                description: "Добродушная, терпеливая, любит воду.",
                fullInfo: `
                    <h5>Характеристики:</h5>
                    <ul>
                        <li><strong>Рост:</strong> 56-61 см (кобели), 51-56 см (суки)</li>
                        <li><strong>Вес:</strong> 30-34 кг (кобели), 25-32 кг (суки)</li>
                        <li><strong>Продолжительность жизни:</strong> 10-12 лет</li>
                        <li><strong>Темперамент:</strong> Дружелюбный, надёжный, доверчивый</li>
                    </ul>
                    <h5 class="mt-3">Особенности ухода:</h5>
                    <p>Нуждается в регулярном вычесывании. Отличный пловец, любит воду.</p>
                `,
                image: "img/retr1.jpg"
            }
        ];
        
        // ⬇⬇⬇ ВАЖНО: ТОЛЬКО ОДИН return ⬇⬇⬇
        return allDogs.find(dog => dog.id == this.id) || allDogs[0];
    }

    onBackClick() {
        window.history.pushState({ page: 'main' }, '', '/');
        window.dispatchEvent(new Event('popstate'));
    }

    render() {
        const data = this.getData();
        
        this.parent.innerHTML = '';
        
        // Кнопка назад
        const backButtonContainer = document.createElement('div');
        this.parent.appendChild(backButtonContainer);
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.onBackClick);
        
        // Детальная информация о собаке
        this.parent.insertAdjacentHTML('beforeend', `
            <div class="row mt-4">
                <div class="col-md-6">
                    <img src="${data.image}" class="img-fluid rounded shadow" 
                         alt="${data.breed}" style="max-height: 400px; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <h2>${data.breed}</h2>
                    <p class="lead">${data.description}</p>
                    <div class="mt-4">
                        ${data.fullInfo}
                    </div>
                    <div class="mt-4">
                        <button class="btn btn-success">Забронировать щенка</button>
                        <button class="btn btn-outline-primary ms-2">Задать вопрос</button>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info mt-5">
                <h5>ℹ️ Контактная информация</h5>
                <p>Телефон: +7 (XXX) XXX-XX-XX<br>
                Адрес питомника: г. Москва, ул. Собачья, д. 5<br>
                Часы работы: ежедневно с 10:00 до 19:00</p>
            </div>
        `);
    }
}