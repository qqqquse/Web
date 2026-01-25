import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  get pageRoot() {
    return document.getElementById('main-page');
  }

  getHTML() {
    return `<div id="main-page" class="container mt-4 d-flex flex-wrap gap-4"></div>`;
  }

  getData() {
    return [
      {
        id: "1",
        title: "Молоко",
        text: "Свежее коровье молоко 3.2%",
        src: "./assets/png1.jpg",
        category: "Молочные продукты",
        price: "85 ₽"
      },
      {
        id: "2",
        title: "Яблоки",
        text: "Зелёные яблоки, 1 кг",
        src: "./assets/yabloki-zelenye.jpg",
        category: "Фрукты",
        price: "120 ₽"
      },
      {
        id: "3",
        title: "Хлеб ржаной",
        text: "На закваске, без дрожжей",
        src: "./assets/png2.jpg",
        category: "Выпечка",
        price: "55 ₽"
      }
    ];
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    import("../product/index.js").then(module => {
      const ProductPage = module.ProductPage;
      const productPage = new ProductPage(this.parent, cardId);
      productPage.render();
    });
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const data = this.getData();
    data.forEach(item => {
      const card = new ProductCardComponent(this.pageRoot);
      card.render(item, this.clickCard.bind(this));
    });
  }
}