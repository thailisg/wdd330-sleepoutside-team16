// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
	return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
// retrieve data from localstorage
export function getLocalStorage(key) {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Error getting data from localStorage:", error);
		return null;
	}
}
// save data to local storage
export function setLocalStorage(key, data) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error("Error saving data to localStorage:", error);
	}
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
	qs(selector).addEventListener("touchend", (event) => {
		event.preventDefault();
		callback();
	});
	qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
	const params = new URLSearchParams(window.location.search);
	return params.get(param);
}

// Render a list of items using an HTML template function.
// - templateFn(item) should return an HTML string for one item.
// - listElement is a DOM node (e.g. <ul> or <div>)
// - items is an array of data items
// - position is one of "beforeend", "afterbegin", "beforebegin", "afterend"
// - clearBefore indicates if the container should be cleared before rendering
export function renderListWithTemplate(
	templateFn,
	parentElement,
	list,
	position = "afterbegin",
	clear = false
) {
	if (clear) {
		parentElement.innerHTML = "";
	}

	const htmlStrings = list.map(templateFn).join("");
	parentElement.insertAdjacentHTML(position, htmlStrings);
}

export function renderWithTemplate(
	template,
	parentElement,
	data,
	callback
) {
	parentElement.innerHTML = template;
	if (callback) {
		callback(data);
	}
}

export async function loadTemplate(path) {
	const res = await fetch(path);
	const template = await res.text();
	return template;
}



// Placeholder for loading header and footer functionality
export async function loadHeaderFooter() {
	const headerTemplate = await loadTemplate("../partials/header.html");
	const footerTemplate = await loadTemplate("../partials/footer.html");

	const headerElement = document.querySelector("#main-header");
	const footerElement = document.querySelector("#main-footer");

	renderWithTemplate(headerTemplate, headerElement);
	renderWithTemplate(footerTemplate, footerElement);
}

