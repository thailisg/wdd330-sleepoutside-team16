import { setLocalStorage, getLocalStorage } from "./utils.mjs";

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

    console.log(this.product);
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    document.querySelector("#productName").textContent = this.product.Name;

    document.querySelector("#productBrand").textContent = this.product.Brand.Name;

    document.querySelector("#productPrice").textContent = `$${this.product.FinalPrice}`;

    document.querySelector("#productDescription").textContent = this.product.Description;

    document.querySelector("#productImage").src = this.product.Image;

    document.querySelector("#productColor").textContent = this.product.Colors[0].ColorName;
}
}