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
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
    const itemCount = this.list.length;
    const itemTotalElement = document.querySelector(`${this.outputSelector} #item-total`);
    const itemCountElement = document.querySelector(`${this.outputSelector} #item-count`);

    itemTotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    itemCountElement.innerText = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
    
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06) // Assuming a tax rate of 6%
    
    // shipping is $10 for first item and $2 for each additional item
    const itemCount = this.list.reduce((total, item) => 
      {
        total + item.quantity;
      }, 0); // get total quantity of items in the cart

    if (itemCount === 0) {
      this.shipping = 0;
    } else {
      this.shipping = 10 + (itemCount - 1) * 2;
    }
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);


    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}