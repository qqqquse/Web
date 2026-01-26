import { AccordionComponent } from "../../components/accordion/index.js";

interface DogData {
    id: number;
    src: string;
    title: string;
    text: string;
    breed?: string;
    age?: number;
}

export class MainPage {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getData(): DogData[] {
        return [
            {
                id: 1,
                src: "assets/dog1.jpg",
                title: "Лабрадор",
                breed: "Лабрадор ретривер",
                age: 10,
                text: "Дружелюбная и энергичная порода, отличный компаньон для семьи."
            },
            {
                id: 2,
                src: "assets/dog2.jpg",
                title: "Немецкая овчарка",
                breed: "Немецкая овчарка",
                age: 4,
                text: "Умная, преданная и отличная служебная собака."
            },
            {
                id: 3,
                src: "assets/dog3.jpg",
                title: "Бульдог",
                breed: "Английский бульдог",
                age: 6,
                text: "Спокойная, дружелюбная и очень преданная порода."
            },
            {
                id: 4,
                src: "assets/dog4.jpg",
                title: "Золотистый ретривер",
                breed: "Золотой ретривер",
                age: 9,
                text: "Интеллектуальная, добрая и красивая порода."
            }
        ];
    }

    private get pageRoot(): HTMLElement {
        return document.getElementById('main-page') as HTMLElement;
    }

    private getHTML(): string {
        return `
            <div class="container mt-4">
                <h1 class="mb-4">🐶 Наши собаки</h1>
                <p class="lead">Выберите породу, чтобы узнать больше:</p>
                <div class="accordion" id="dogsAccordion">
                    <div id="main-page"></div>
                </div>
            </div>
        `;
    }

    render(): void {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item: DogData) => {
            const accordion = new AccordionComponent(this.pageRoot);
            accordion.render(item);
        });
    }
}