import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function shoppingCartTemplates(product) {
    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
  </li>`;
}

export default class shoppingCart {
    constructor() {
        // Initialize the shopping cart
    }
}