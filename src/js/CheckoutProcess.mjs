import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {

    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
    }

    // Subtotal
    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce(
            (sum, item) => sum + Number(item.FinalPrice),
            0
        );
    }

    // Shipping
    calculateShipping() {
        const totalItems = this.list.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );

        if (totalItems === 0) {
            this.shipping = 0;
        } else {
            this.shipping = 10 + 2 * (totalItems - 1);
        }
    }

    // All total
    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;

        this.calculateShipping();

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    // display in checkout index
    displayOrderTotals() {
        document.querySelector("#subtotal-value").innerText =
            `$${this.itemTotal.toFixed(2)}`;

        document.querySelector("#tax-value").innerText =
            `$${this.tax.toFixed(2)}`;

        document.querySelector("#shipping-value").innerText =
            `$${this.shipping.toFixed(2)}`;

        document.querySelector("#total-value").innerText =
            `$${this.orderTotal.toFixed(2)}`;
    }
}