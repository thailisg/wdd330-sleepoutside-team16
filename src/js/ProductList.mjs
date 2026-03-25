import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
	return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
  </li>`;
}

export default class ProductList {
	constructor(category, dataSource, listElement) {
		this.category = category;
		this.dataSource = dataSource;
		this.listElement = listElement;
	}
	async init() {
		const list = await this.dataSource.getData(this.category);
		console.log("ProductList fetched", list.length, "items");
		console.log("ProductList IDs:", list.map((p) => p.Id));
		this.renderList(list);
	}

	renderList(list) {
		// Remove duplicate products by Id (defensive, in case JSON contains duplicates)
		const uniqueById = Array.from(
			new Map(list.map((p) => [p.Id, p])).values()
		);
		renderListWithTemplate(productCardTemplate, this.listElement, uniqueById, "afterbegin", true);
	}

}
