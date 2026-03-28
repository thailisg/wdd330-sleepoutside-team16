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
		//Task: Product List sort
		this.products = [];
	}
	async init() {
		const list = await this.dataSource.getData(this.category);
		console.log("ProductList fetched", list.length, "items");
		console.log("ProductList IDs:", list.map((p) => p.Id));

		this.products = Array.from(
			new Map(list.map((p) => [p.Id, p])).values()
		);

		this.renderList(list);

		const sortSelect = document.getElementById("sort-select");
		if (sortSelect) {
			sortSelect.addEventListener("change", () => {
				this.sortList(sortSelect.value);
			});
		}
	}

	renderList(list) {
		// Remove duplicate products by Id (defensive, in case JSON contains duplicates)
		const uniqueById = Array.from(
			new Map(list.map((p) => [p.Id, p])).values()
		);
		renderListWithTemplate(productCardTemplate, this.listElement, uniqueById, "afterbegin", true);
	}
	// Task: Product List sort
	sortList(option) {
		let sorted = [...this.products];

		switch (option) {
			case "name-asc":
				sorted.sort((a, b) => a.Name.localeCompare(b.Name));
				break;
			case "name-desc":
				sorted.sort((a, b) => b.Name.localeCompare(a.Name));
				break;
			case "price-asc":
				sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
				break;
			case "price-desc":
				sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
				break;
		}

		this.renderList(sorted);
	}

}
