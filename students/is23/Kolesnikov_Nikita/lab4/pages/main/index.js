import {ProductPage} from "../product/index.js"
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import { FilterComponent } from "../../components/filter/index.js";

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
            <h1 class="text-center text-primary my-4">VK Api</h1>

            <div id="filter-root"></div> 

            <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3 align-items-stretch"></div>
        </div>

        `
    )
}

    getData(filter = '') {
    ajax.get(urls.getGroupMembers(groupId, filter), (data) => {
        this.renderData(data.response.items)
    })
}
    get filterRoot() {
        return document.getElementById('filter-root')
    }

    clickCard(e) {
    const title = e.target.dataset.title
    const src = e.target.dataset.src
    const id = e.target.dataset.id

    const productPage = new ProductPage(this.parent, title, src, id)
    productPage.render()
}

    renderData(items) {
        this.pageRoot.innerHTML = '';
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

        onFilterChange(filter) {
        this.currentFilter = filter;
        this.getData(this.currentFilter);
    }

    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const filterComponent = new FilterComponent(this.filterRoot);
        filterComponent.render(this.onFilterChange.bind(this));
        this.getData();
    }
    
}

