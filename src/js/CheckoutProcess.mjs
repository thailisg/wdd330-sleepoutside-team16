import { calculateTotal } from "./cart.mjs";

export default class CheckoutProcess {
    constructor() {
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
    }

    calculateSubtotal(totalCart) {
        this.subtotal = calculateTotal(totalCart);
    }

    calculateTax() {
        this.tax = this.subtotal * 0.06;
    }

    calculateShipping(items) {
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (totalItems === 0) {
            this.shipping = 0;
        } else {
            this.shipping = 10 + 2 * (totalItems - 1);
        }
    }

    calculateTotal() {
        this.total = this.subtotal + this.tax + this.shipping;
    }

    updateTotals(cartItems) {
        this.calculateSubtotal(cartItems);
        this.calculateTax();
        this.calculateShipping(cartItems);
        this.calculateTotal();
    }
}