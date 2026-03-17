import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
console.log("Product ID from URL:", productId);

const dataSource = new ProductData("tents");

function addProductToCart(product) {
	if (!product) {
		console.error("Cannot add null product to cart");
		return;
	}
	let cartItems = getLocalStorage("so-cart");
	// Ensure cartItems is always an array
	if (!Array.isArray(cartItems)) {
		cartItems = [];
	}
	cartItems.push(product);
	setLocalStorage("so-cart", cartItems);
	console.log("Product added to cart:", product);
	console.log("Cart now has", cartItems.length, "items");
	alert(`${product.Name} added to cart!`);
}
// add to cart button event handler
async function addToCartHandler(e) {
	const id = e.target.dataset.id;
	console.log("Add to cart clicked. Product ID:", id);
	const product = await dataSource.findProductById(id);
	if (!product) {
		console.error("Product not found:", id);
		return;
	}
	addProductToCart(product);
}

// Initialize ProductDetails
if (productId) {
	const product = new ProductDetails(productId);
	product.init().catch((error) => {
		console.error("Error initializing product details:", error);
	});
} else {
	console.warn("No product ID found in URL");
}

// Add listener to Add to Cart button
const addToCartBtn = document.getElementById("addToCart");
if (addToCartBtn) {
	addToCartBtn.addEventListener("click", addToCartHandler);
} else {
	console.error("Add to Cart button not found");
}