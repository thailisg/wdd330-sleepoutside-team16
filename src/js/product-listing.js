import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";

const titleElement = document.querySelector(".title");

if (category) {
  const formatted = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.textContent = `: ${formatted}`;
}

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, element);

listing.init();
