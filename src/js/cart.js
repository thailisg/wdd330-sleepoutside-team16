import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
const dataSource = new ProductData();


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

async function renderCartContents() {
	const storedCart = getLocalStorage("so-cart") || [];
	const cartItems = normalizeCartData(storedCart);

	const listEl = document.querySelector(".product-list");
	if (!listEl) return;


	const items = cartItems
		.map((item) => {
			const product = storedCart.find(p => (p.Id ?? p.id) === item.id);
			if (!product) return null;
			return {
				...product,
				quantity: item.quantity,
			};
		})
		.filter(Boolean);

	if (!items.length) {
		listEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
		return;
	}

	const htmlItems = items.map((item) => cartItemTemplate(item));
	listEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
	const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryLarge}" 
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

	return newItem;
}

renderCartContents();
