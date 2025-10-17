import { qs, getParam} from "./utils.mjs";
import {ProductService} from "./product-service.mjs"

const productId = getParam('id');
const productDetailsContainer = qs('#product-details'); 

/**
 * Load product details and render them into the page.
 *
 * This async function instantiates a ProductService, fetches a product by the
 * externally scoped `productId`, creates an HTML fragment using
 * `productDetailsTemplate(product)`, and injects the result into the
 * externally scoped `productDetailsContainer` element's `innerHTML`.
 *
 * Side effects:
 * - Performs network I/O to retrieve product data.
 * - Mutates the DOM by setting `productDetailsContainer.innerHTML`.
 *
 * @async
 * @function loadProductDetails
 * @returns {Promise<void>} Resolves when the product has been fetched and rendered.
 * @throws {Error} If the product fetch or template rendering fails.
 * @throws {ReferenceError} If required globals (productId, productDetailsContainer,
 *   ProductService, or productDetailsTemplate) are undefined.
 */
const loadProductDetails = async () => {
    const productService = new ProductService();
    const product = await productService.findProductById(productId); 
    const template = productDetailsTemplate(product);
    productDetailsContainer.innerHTML = template;
};
 
const productDetailsTemplate = ({
    id, imageTsrc, name, shape, gender, price, mPrice, rating,dimension, color, style
}) => {
    return `        
        <div class="grid md:grid-cols-2 filter-nav-animate" id="${id}">
            <div class="aspect-square overflow-hidden border-r-2 border-skyblue/20 p-4">
                <img src="${imageTsrc}" alt="${name} - ${shape}" class="w-full h-full object-contain">
            </div>
            <div class="p-6">
                <h1 class="font-serif text-3xl font-bold text-primary mb-4">${name} - ${shape}</h1>
                <p class="text-gray-600 mb-4">Shape: ${shape}</p>
                <p class="text-gray-600 mb-4">Colors: ${color}</p>
                <p class="text-gray-600 mb-4">Gender: ${gender}</p>
                <p class="text-gray-600 mb-4">Style: ${style}</p>
                <p class="text-gray-600 mb-4">Dimensions: ${dimension}</p>
                <p class="text-gray-600 mb-4">Rating: ★ ${rating}</p>
                <p class="text-gray-600 mb-4">Price: 
                    <span class="text-accent font-bold">$${price}</span> 
                    <span class="line-through">$${mPrice}</span>
                </p>
                <button class="bg-accent text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-secondary transition-colors mx-auto block">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;
} 


window.addEventListener('DOMContentLoaded', loadProductDetails());