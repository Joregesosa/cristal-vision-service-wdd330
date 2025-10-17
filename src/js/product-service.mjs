import FirebaseService from './firebase-service.mjs';
import { addDoc, collection, getDocs, query, where, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";


export class ProductService {
    constructor() {
        this.db = FirebaseService.getFirestoreInstance();
        this.productCol = collection(this.db, 'products');
    }

    /**
     * Retrieves all products from the Firestore collection.
     *
     * @async
     * @returns {Promise<Array>} A promise that resolves to an array of products.
     */
    async getAllProducts() {
        try {
            const snapshot = await getDocs(this.productCol);
            const products = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}));
            return products;
        } catch (error) {
            console.error("Error fetching products: ", error);
            return [];
        }
    }

    /**
     * Finds a product by its document ID in the Firestore collection.
     *
     * @async
     * @param {string} id - The document ID of the product to find.
     * @returns {Promise<Object|null>} A promise that resolves to the product object if found, or null if not found.
     */
    async findProductById(id) {
        try {
            const docRef = doc(this.db, 'products', id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }

            console.log(`No product found with id: ${id}`);
            return null;

        } catch (error) {
            console.error("Error finding product by id: ", error);
            return null;
        }
    }

    /**
     * Adds a new product to the Firestore collection.
     *
     * @async
     * @param {Object} product - The product object to add.
     * @returns {Promise<string|null>} A promise that resolves to the ID of the added product, or null if an error occurred.
     */
    async addProduct(product) {
        try {
            const docRef = await addDoc(this.productCol, product);
            return docRef.id;
        } catch (error) {
            console.error("Error adding product: ", error);
            return null;
        }
    }

    /**
     * Deletes a product from the database by its document ID.
     *
     * @async
     * @param {string} id - The document ID of the product to delete.
     * @returns {Promise<boolean>} Returns true if the product was deleted successfully, false otherwise.
     */
    async deleteProduct(id) {
        try {
            const docRef = doc(this.db, 'products', id);
            await deleteDoc(docRef);
            console.log(`Product with id: ${id} deleted successfully`);
            return true;
        } catch (error) {
            console.error("Error deleting product: ", error);
            return false;
        }
    }

    /**
     * Updates a product in the Firestore collection with the specified document ID and updated data.
     *
     * @async
     * @param {string} id - The document ID of the product to update.
     * @param {Object} updatedData - An object containing the fields and values to update for the product.
     * @returns {Promise<boolean>} Returns true if the product was updated successfully, false otherwise.
     */
    async updateProduct(id, updatedData) {
        try {
            const docRef = doc(this.db, 'products', id);
            await updateDoc(docRef, updatedData);
            console.log(`Product with id: ${id} updated successfully`);
            return true;
        } catch (error) {
            console.error("Error updating product: ", error);
            return false;
        }
    }
}

export default ProductService;