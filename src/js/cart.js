import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart items from localStorage:", cartItems);

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      '<li class="empty-cart">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => {
    console.log("Rendering item:", item);
    console.log("Item image:", item.Image);
    return cartItemTemplate(item);
  });
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", removeItemHandler);
  });

  renderCartTotal(cartItems);
}

function normalizeImagePath(path) {
  if (!path) return path;
  // Ensure assets are loaded from the webroot so paths work from any page.
  return path.replace(/^(\.\.\/)+/, "/");
}

function cartItemTemplate(item) {
  const rawImage =
    item.Images?.PrimaryLarge ||
    item.Images?.PrimaryMedium ||
    item.Images?.PrimarySmall ||
    "../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg";
  const imageSrc = normalizeImagePath(rawImage);;
  const imageAlt = item.Name || "Product image";

  const newItem = `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">&times;</span>
		<a href="#" class="cart-card__image">
			<img
				src="${imageSrc}"
				alt="${imageAlt}"
				onerror="this.src='../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg'" />
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

/*Task: Total$ in Cart*/

function calculateTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );
  return total;
}

function renderCartTotal(cartItems) {
  const total = calculateTotal(cartItems);

  const totalElement = document.querySelector(".cart-total");
  const footer = document.querySelector(".cart-footer");

  if (totalElement && footer) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    footer.classList.remove("hide");
  }
}

/*Task: Remove from cart feature*/

function removeItemHandler(e) {
  const id = e.target.dataset.id;
  console.log("Removing item with ID:", id);

  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id != id);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();
