// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
	return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key, defaultValue = null) {
	const raw = localStorage.getItem(key);
	if (raw === null) return defaultValue;

	try {
		return JSON.parse(raw);
	} catch (error) {
		// If stored value isn't valid JSON, fall back to default.
		return defaultValue;
	}
}
// save data to local storage
export function setLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
	qs(selector).addEventListener("touchend", (event) => {
		event.preventDefault();
		callback();
	});
	qs(selector).addEventListener("click", callback);
}

// Render a list of items using an HTML template function.
// - templateFn(item) should return an HTML string for one item.
// - listElement is a DOM node (e.g. <ul> or <div>)
// - items is an array of data items
// - position is one of "beforeend", "afterbegin", "beforebegin", "afterend"
// - clearBefore indicates if the container should be cleared before rendering
export function renderListWithTemplate(
	templateFn,
	listElement,
	items,
	position = "beforeend",
	clearBefore = true
) {
	if (!listElement) return;
	if (clearBefore) {
		listElement.innerHTML = "";
	}

	const html = items.map((item) => templateFn(item)).join("");
	listElement.insertAdjacentHTML(position, html);
}
