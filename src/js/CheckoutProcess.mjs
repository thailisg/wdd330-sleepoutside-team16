import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
	const formData = new FormData(formElement);
	const convertedJSON = {};

	formData.forEach((value, key) => {
		convertedJSON[key] = value;
	});

	return convertedJSON;
}

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
		const items = this.list;

		this.itemTotal = items.reduce((sum, item) => {
			return sum + (item.FinalPrice ?? item.price) * (item.quantity ?? 1);
		}, 0);
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

	packageItems(items) {
		return items.map(item => ({
			id: item.Id,
			name: item.Name,
			price: item.FinalPrice ?? item.price,
			quantity: item.quantity ?? item.Qty ?? 1
		}));
	}

	async checkout(form) {
		try {
			this.calculateItemSubTotal();
			this.calculateOrderTotal();

			const formData = formDataToJSON(form);

			const orderData = {
				fname: formData.firstname?.trim(),
				lname: formData.lastname?.trim(),
				street: formData.address?.trim(),
				city: formData.city?.trim(),
				state: formData.state?.trim(),
				zip: formData.zip?.trim(),
				cardNumber: formData.cardNumber?.replace(/\s+/g, "").trim(),
				expiration: formData.expiration?.trim(),
				code: formData.code?.trim(),
				orderDate: new Date().toISOString(),
				items: this.packageItems(this.list),
				orderTotal: Number(this.orderTotal.toFixed(2)),
				shipping: this.shipping,
				tax: Number(this.tax.toFixed(2))
			};

			console.log("ORDER DATA:", JSON.stringify(orderData, null, 2));

			const services = new ExternalServices();
			const result = await services.checkout(orderData);

			return result;
		} catch (err) {
			console.error("Checkout error:", err);
			alert(err.message?.message || "Error processing order");
			return null;
		}
	}

}