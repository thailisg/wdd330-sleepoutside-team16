import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

console.log("main is working");

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    const dataSource = new ProductData("tents");
    const listElement = document.querySelector(".product-list");
    const productList = new ProductList(
        "tents",
        dataSource,
        listElement
    );

    productList.init();
});
