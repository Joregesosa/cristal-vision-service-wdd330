import FirebaseService from './firebase-service.mjs';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";


export class ProductService {
    constructor() {
        this.productCol = collection(this.db, 'products');
        this.db = FirebaseService.getFirestoreInstance();
        this.db = FirebaseService.getFirestoreInstance();
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
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return products;
        } catch (error) {
            console.error("Error fetching products: ", error);
            return [];
        }
    }

    /**
     * Finds a product by its ID in the Firestore collection.
     *
     * @async
     * @param {string} id - The ID of the product to find.
     * @returns {Promise<Object|null>} A promise that resolves to the product object if found, or null if not found.
     */
    async findProductById(id) {
        try {
            const q = query(this.productCol, where('id', '==', id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                return { id: doc.id, ...doc.data() };
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
     * Deletes a product from the database by its ID.
     *
     * @async
     * @param {string} id - The ID of the product to delete.
     * @returns {Promise<boolean>} Returns true if the product was deleted successfully, false otherwise.
     */
    async deleteProduct(id) {
        try {
            const q = query(this.productCol, where('id', '==', id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                await deleteDoc(doc.ref);
                console.log(`Product with id: ${id} deleted successfully`);
                return true;
            }
            console.log(`No product found with id: ${id}`);
            return false;
        } catch (error) {
            console.error("Error deleting product: ", error);
            return false;
        }
    }

    /**
     * Updates a product in the Firestore collection with the specified ID and updated data.
     *
     * @async
     * @param {string} id - The unique identifier of the product to update.
     * @param {Object} updatedData - An object containing the fields and values to update for the product.
     * @returns {Promise<boolean>} Returns true if the product was updated successfully, false otherwise.
     */
    async updateProduct(id, updatedData) {
        try {
            const q = query(this.productCol, where('id', '==', id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                await updateDoc(doc.ref, updatedData);
                console.log(`Product with id: ${id} updated successfully`);
                return true;
            }
            console.log(`No product found with id: ${id}`);
            return false;
        } catch (error) {
            console.error("Error updating product: ", error);
            return false;
        }
    }
}

export default ProductService;