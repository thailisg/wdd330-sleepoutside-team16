import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const checkout = new CheckoutProcess("so-cart", "#order-summary");

  checkout.init();
  checkout.calculateItemSubTotal();

  const zipInput = document.getElementById("zip");

  zipInput.addEventListener("change", () => {
    checkout.calculateOrderTotal();
  });
});