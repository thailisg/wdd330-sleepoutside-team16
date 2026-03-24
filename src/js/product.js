import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
console.log("Product ID from URL:", productId);

const dataSource = new ProductData();

// Initialize ProductDetails
if (productId) {
	const product = new ProductDetails(productId, dataSource);
	product.init().catch((error) => {
		console.error("Error initializing product details:", error);
	});
} else {
	console.warn("No product ID found in URL");
}