import { ProductService } from './product-service.mjs';
import { qs, getAllCurrentParams } from './utils.mjs';

const productService = new ProductService();
const productGrid = qs('#product-grid');
const genderFilter = qs('#gender');
const productTypeFilter = qs('#productType');
const clearFiltersBtn = qs('#clear-filters');
const searchInput = qs('#search');

/**
 * Asynchronously fetches all products and renders them into the product grid.
 *
 * The function:
 *  - awaits productService.getAllProducts() to retrieve an array of product objects,
 *  - maps each product through productTemplate to produce HTML strings,
 *  - joins the strings and assigns the result to productGrid.innerHTML.
 *
 * Any errors thrown by productService.getAllProducts(), productTemplate, or while updating
 * the DOM will propagate to the caller.
 *
 * @async
 * @returns {Promise<void>} Resolves when the product grid DOM has been updated.
 * @throws {Error} If fetching products or updating the DOM fails.
 * @see productService.getAllProducts
 * @see productTemplate
 * @see productGrid
 */
const renderProducts = async () => {
    const products = await productService.getAllProducts();
    let filteredProducts = applyFilters(products);
    const productCards = filteredProducts.map(productTemplate).join('');
    productGrid.innerHTML = productCards;
}


/**
 * Generates an HTML string for a product card.
 *
 * @param {Object} product - The product details.
 * @param {string|number} product.id - Unique identifier for the product.
 * @param {string} product.imageTsrc - Image source URL for the product.
 * @param {string} product.name - Name of the product.
 * @param {string} product.shape - Shape or style of the product.
 * @param {string} product.gender - Gender category of the product.
 * @param {number} product.price - Current price of the product.
 * @param {number} product.mPrice - Market or original price of the product.
 * @param {number} product.rating - Rating of the product.
 * @returns {string} HTML markup for the product card.
 */
const productTemplate = ({
    id, imageTsrc, name, shape, gender, price, mPrice, rating
}) => {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden relative transition-transform duration-300 hover:scale-105 hover:shadow-xl filter-nav-animate" id="${id}">
            <img src="${imageTsrc}" alt="${name} - ${shape}" class="w-full h-48 object-contain ">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">${name} - ${shape}</h2>
                <p class="text-gray-700 mb-2">Género: ${gender}</p>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-blue-600">$${price}</span>
                    <span class="text-sm line-through text-gray-500">$${mPrice}</span>
                </div>
                <div class="mt-2 flex items-center">
                    <span class="text-yellow-500">★ ${rating}</span>
                </div>
                <a href="products/product-details.html?id=${id}" class="inset-0 absolute" aria-label="product-card"></a>
            </div>
        </div>
    `
}



const applyFilters = (products) => {
    const params = getAllCurrentParams();
    let filteredProducts = null;
    params.forEach(({ key, value }) => {
        if (value) {
            filteredProducts = filteredProducts ? filteredProducts.filter(product => product[key] === value) :
                products.filter(product => product[key] === value);
        }
    });
    return filteredProducts ?? products;
}

const setParamsFilterValues = (e) => {
    const selectedFilterId = e.target.id;
    const selectedValue = e.target.value;
    const url = new URL(window.location);

    if (selectedValue) {
        url.searchParams.set(selectedFilterId, selectedValue);
    }
    else {
        url.searchParams.delete(selectedFilterId);
    }
    history.pushState(null, '', url.toString());
    renderProducts();
}

const clearFilterValues = () => {
    const allCurrentParams = getAllCurrentParams();
    const url = new URL(window.location);
    allCurrentParams.forEach(({ key }) => {
        url.searchParams.delete(key);
    });
    history.pushState(null, '', url.toString());
    renderProducts();
}

const search = () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    if (!searchValue) {
        renderProducts();
        return;
    }
    productService.getAllProducts().then(products => {
        const searchedProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchValue) ||
            product.shape.toLowerCase().includes(searchValue) ||
            product.gender.toLowerCase().includes(searchValue)
        );
        const productCards = searchedProducts.map(productTemplate).join('');
        productGrid.innerHTML = productCards;
    });

}


searchInput.addEventListener('input', search)
document.addEventListener('DOMContentLoaded', renderProducts);
genderFilter.addEventListener('change', setParamsFilterValues);
productTypeFilter.addEventListener('change', setParamsFilterValues);
clearFiltersBtn.addEventListener('click', clearFilterValues);