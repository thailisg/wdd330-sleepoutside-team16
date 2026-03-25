import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
console.log(" Product ID from URL:", productId);
const dataSource = new ProductData();


if (productId) {
	const product = new ProductDetails(productId, dataSource);
	product.init().catch((error) => {
		console.error("Error initializing product details:", error);
	});
} else {
	console.warn("No product ID found in URL");
}

