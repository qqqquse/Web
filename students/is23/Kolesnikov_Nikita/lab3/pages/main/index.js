import {ProductPage} from "../product/index.js"
import {ProductCardComponent} from "../../components/product-card/index.js";
export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
    return document.getElementById('main-page')
    }

    getHTML() {
    return (
        `
        <div>
            <h1 class="text-center text-primary my-4">Стили дизайна</h1>
            <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3 align-items-stretch"></div>
        </div>

        `
    )
}

    getData() {
    return [
        {
            id: 1,
            src: "./assets/modern.png",
            title: "Модерн",
            text: "Плавные линии, природные формы, растительные орнаменты, декоративность."
        },
        {
            id: 2,
            src: "./assets/industrial.png",
            title: "Индустриальный",
            text: "Кирпич, бетон, металл, открытые коммуникации, ощущение фабричного пространства."
        },
        {
            id: 3,
            src: "./assets/minimalism.png",
            title: "Минимализм",
            text: "Простота, чистые линии, минимум декора, функциональность."
        },
        {
            id: 4,
            src: "./assets/scandinavian.png",
            title: "Скандинавский",
            text: "Светлые тона, натуральные материалы, уют, простота форм."
        },
        {
            id: 5,
            src: "./assets/hi-tech.png",
            title: "Хай-тек",
            text: "Современные технологии, стекло, металл, глянец, строгая геометрия."
        }
    ]
}

    clickCard(e) {
    const title = e.target.dataset.title
    const src = e.target.dataset.src
    const id = e.target.dataset.id

    const productPage = new ProductPage(this.parent, title, src, id)
    productPage.render()
}

    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this));
    })
    }
}

