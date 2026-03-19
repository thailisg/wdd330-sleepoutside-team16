import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function normalizeCartData(rawCart) {
	const cart = Array.isArray(rawCart) ? rawCart : rawCart ? [rawCart] : [];
	const map = new Map();

	for (const entry of cart) {
		if (!entry) continue;

		const id = entry.Id ?? entry.id;
		if (!id) continue;

		const quantity = Number(entry.quantity ?? entry.qty ?? 1) || 1;

		const existing = map.get(id);
		if (existing) {
			existing.quantity += quantity;
		} else {
			map.set(id, { id, quantity });
		}
	}

	return Array.from(map.values());
}

function addProductToCart(product) {
	if (!product || !product.Id) return;

	const rawCart = getLocalStorage("so-cart", []);
	const cart = normalizeCartData(rawCart);

	const existing = cart.find((item) => item.id === product.Id);
	if (existing) {
		existing.quantity += 1;
	} else {
		cart.push({ id: product.Id, quantity: 1 });
	}

	setLocalStorage("so-cart", cart);
	alert(`${product.Name} added to cart!`);
}

// add to cart button event handler
async function addToCartHandler(e) {
	const product = await dataSource.findProductById(e.target.dataset.id);
	addProductToCart(product);
}

// add listener to Add to Cart button
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
	addToCartButton.addEventListener("click", addToCartHandler);
}
