import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  getData() {
    const products = [
      {
        id: "1",
        title: "Молоко",
        text: "Свежее коровье молоко 3.2%. Срок годности — 5 дней. Хранить при +2…+6°C.",
        src: "assets/png1.jpg",
        category: "Молочные продукты",
        price: "85 ₽",
        inStock: true
      },
      {
        id: "2",
        title: "Яблоки",
        text: "Зелёные яблоки сорта Гренни Смит. Богаты витамином C и клетчаткой.",
        src: "assets/yabloki-zelenye.jpg",
        category: "Фрукты",
        price: "120 ₽",
        inStock: true
      },
      {
        id: "3",
        title: "Хлеб ржаной",
        text: "Ржаной хлеб на закваске. Без дрожжей и консервантов. Идеален для ЗОЖ.",
        src: "assets/png2.jpg",
        category: "Выпечка",
        price: "55 ₽",
        inStock: false
      }
    ];
    return products.find(p => p.id === this.id) || products[0];
  }

  get pageRoot() {
    return document.getElementById('product-page');
  }

  getHTML() {
    return `<div id="product-page" class="container mt-4"></div>`;
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const data = this.getData();
    const product = new ProductComponent(this.pageRoot);
    product.render(data);

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
  }
}