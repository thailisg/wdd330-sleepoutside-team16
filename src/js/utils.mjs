// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
	return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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
// get a query parameter from the URL
export function getParam(param) {
	const searchParams = new URLSearchParams(window.location.search);
	return searchParams.get(param);
}

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
