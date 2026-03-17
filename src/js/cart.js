import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
	const cartItems = getLocalStorage("so-cart");
	console.log("Cart items from localStorage:", cartItems);

	if (!cartItems || !Array.isArray(cartItems)) {
		console.log("No cart items found or cart is not an array");
		return;
	}

	const htmlItems = cartItems.map((item) => {
		console.log("Rendering item:", item);
		console.log("Item image:", item.Image);
		return cartItemTemplate(item);
	});
	document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
	// Add fallback for missing image
	const imageSrc = item.Image || "../images/tents/default-tent.jpg";
	const imageAlt = item.Name || "Product image";

	const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${imageAlt}"
      onerror="this.src='../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg'"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name || "Unknown Product"}</h2>
  </a>
  <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "N/A"}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice || "N/A"}</p>
</li>`;

	return newItem;
}

renderCartContents();
