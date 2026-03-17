import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      '<li class="empty-cart">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
      
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

/*Task: Total$ in Cart*/

function calculateTotal(cartItems) {
  
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
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

renderCartContents();
