

/**
 * Returns the first element within the document (or specified parent) that matches the given CSS selector.
 *
 * @param {string} selector - The CSS selector to match.
 * @param {ParentNode} [parent=document] - The parent node to search within. Defaults to the document.
 * @returns {Element|null} The first matching element, or null if no matches are found.
 */
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Retrieves the value of a specified query parameter from the current page's URL.
 *
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get(param);
    return value;
}

/**
 * Parse the current page's query string and return all parameters as an array of objects.
 *
 * Reads window.location.search and uses URLSearchParams to extract parameters. Each entry
 * is returned as an object with `key` and `value` properties, preserving the parameter order.
 *
 * @returns {Array<{key: string, value: string}>} An array of parameter objects. Returns an empty array if there are no query parameters.
 */
export function getAllCurrentParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Array.from(urlParams.entries(), ([key, value]) => ({ key, value }));
}

/**
 * Asynchronously loads an HTML template from the specified path.
 *
 * @param {string} path - The path to the template file.
 * @returns {Promise<string>} A promise that resolves to the template content as a string.
 */
export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}


/**
 * Renders HTML content using a provided template and inserts it into a parent element.
 * Optionally executes a callback function after rendering.
 *
 * @param {string} template - The HTML template string to render.
 * @param {HTMLElement} parentElement - The DOM element where the template will be rendered.
 * @param {*} data - Data to be passed to the callback function.
 * @param {Function} [callback=() => {}] - Optional callback to execute after rendering, receives `data` as an argument.
 */
export function renderWithTemplate(template, parentElement, data, callback = () => { }) {
    const html = template
    parentElement.innerHTML = html;
    callback(data);
}

/**
 * Asynchronously loads and renders the header and footer templates into their respective DOM elements.
 *
 * @async
 * @function loadHeaderFooter
 * @returns {Promise<void>} Resolves when the header and footer have been loaded and rendered.
 */
export async function loadHeaderFooter() {
    const headertTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = qs('#app-header');
    const footerElement = qs('#app-footer');
    renderWithTemplate(headertTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}