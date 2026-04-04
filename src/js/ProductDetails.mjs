import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
	constructor(productId, dataSource) {
		this.productId = productId;
		this.product = {};
		this.dataSource = dataSource;
	}

	async init() {

		this.product = await this.dataSource.findProductById(this.productId);
		this.renderProductDetails();

		document
			.getElementById("addToCart")
			.addEventListener("click", this.addProductToCart.bind(this));
		/*try {
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
		}*/
	}

	addProductToCart() {
		let cartItems = getLocalStorage("so-cart") || [];

		const existingItem = cartItems.find(
			item => item.Id === this.product.Id
		);

		if (existingItem) {
			existingItem.quantity = (existingItem.quantity || 1) + 1;
		} else {
			this.product.quantity = 1; // 🔥 CLAVE
			cartItems.push(this.product);
		}

		setLocalStorage("so-cart", cartItems);
	}

	renderProductDetails() {
		productDetailsTemplate(this.product);
	}
}

function productDetailsTemplate(product) {
	document.querySelector("#productBrand").textContent = product.Brand.Name;
	document.querySelector("#productName").textContent = product.Name;

	const productImage = document.querySelector("#productImage");
	productImage.src = product.Images.PrimaryLarge;
	productImage.alt = product.Name;

	document.querySelector("#productPrice").textContent = `$${product.FinalPrice}`;
	document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
	document.querySelector("#productDescription").innerHTML = product.DescriptionHtmlSimple;

	document.querySelector("#addToCart").dataset.id = product.Id;
}
