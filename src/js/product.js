import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // retrieve stored value (might be array, single object, or invalid)
  let cart = [];
  try {
    const existing = JSON.parse(localStorage.getItem("so-cart"));
    if (Array.isArray(existing)) {
      cart = existing;
    } else if (existing && typeof existing === "object") {
      // previous version saved a lone product object; wrap it
      cart = [existing];
    } else {
      cart = [];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("could not parse existing cart", err);
    cart = [];
  }

  // add the new item and persist
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
