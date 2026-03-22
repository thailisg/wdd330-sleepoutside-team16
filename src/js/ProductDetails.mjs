import { qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductDetails {
	constructor(productId) {
		this.productId = productId;
		this.product = {};
		this.dataSource = new ProductData("tents");
	}

	async init() {
		try {
			console.log("Initializing product details for ID:", this.productId);
			this.product = await this.dataSource.findProductById(this.productId);
			if (!this.product) {
				console.error("Product not found for ID:", this.productId);
				return;
			}
			console.log("Product found:", this.product);
			this.renderProductDetails();
		} catch (error) {
			console.error("Error loading product:", error);
		}
	}

	renderProductDetails() {
		if (!this.product) {
			console.error("Product not found");
			return;
		}

		try {
			// Update product details in the page
			const brandName = typeof this.product.Brand === "object" ? this.product.Brand.Name : this.product.Brand;
			document.querySelector(".product-detail h3").textContent = brandName;
			document.querySelector(".product-detail h2").textContent = this.product.Name;
			const productImageSrc = this.product.Image?.replace(/^(\.\.\/)+/, "/");
			document.querySelector(".product-detail img").src = productImageSrc;
			if (descriptionEl && this.product.DescriptionFull) {
				descriptionEl.textContent = this.product.DescriptionFull;
			}

			// Update the data-id attribute for the Add to Cart button
			const addToCartButton = document.getElementById("addToCart");
			if (addToCartButton) {
				addToCartButton.dataset.id = this.productId;
				console.log("Button data-id set to:", this.productId);
			}
		} catch (error) {
			console.error("Error rendering product details:", error);
		}
	}
}
