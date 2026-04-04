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

  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
			 checkout.calculateOrderTotal();
    const isValid = form.checkValidity();
    form.reportValidity();

    if (!isValid) return;

    try {
      const result = await checkout.checkout(form);

      console.log("Response from server:", result);

      console.log("RESULT:", result);

      if (!result) return;

      localStorage.removeItem("so-cart");

      window.location.href = "/success.html";

    } catch (error) {
      console.error("Error en checkout:", error);
      alert("There was an error processing your order.");
    }
  });
});