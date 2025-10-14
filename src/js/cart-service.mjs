import FirebaseService from './firebase-service.mjs';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

class CartService {
    constructor() {
        this.cartCol = collection(this.db, 'carts');
        this.db = FirebaseService.getFirestoreInstance();
    }

    /**
     * Retrieves all cart items from the Firestore collection.
     *
     * @async
     * @returns {Promise<Array>} A promise that resolves to an array of cart items.
     */
    async getAllCartItems() {
        try {
            const snapshot = await getDocs(this.cartCol);
            const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return cartItems;
        } catch (error) {
            console.error("Error fetching cart items: ", error);
            return [];
        }
    }

    /**
     * Finds a cart item by its ID in the Firestore collection.
     *
     * @async
     * @param {string} id - The ID of the cart item to find.
     * @returns {Promise<Object|null>} A promise that resolves to the cart item object if found, or null if not found.
     */
    async findCartItemById(id) {
        try {
            const q = query(this.cartCol, where('id', '==', id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
            console.log(`No cart item found with id: ${id}`);
            return null;
        } catch (error) {
            console.error("Error finding cart item by id: ", error);
            return null;
        }
    }

    /**
     * Adds a new cart item to the Firestore collection.
     * 
     * @async
     * @param {Object} cartItem - The cart item object to add.
     * @returns {Promise<string|null>} A promise that resolves to the ID of the added cart item, or null if an error occurred.
     */
    async addCartItem(cartItem) {
        try {
            const docRef = await addDoc(this.cartCol, cartItem);
            return docRef.id;
        } catch (error) {
            console.error("Error adding cart item: ", error);
            return null;
        }
    }

    /**
     * Removes a cart item by its ID from the Firestore collection.
     * @async
     * @param {string} id - The ID of the cart item to remove.
     * @returns {Promise<boolean>} A promise that resolves to true if removal was successful, or false if an error occurred.
     */
    async removeCartItem(id) {
        try {
            const cartItem = await this.findCartItemById(id);
            if (cartItem) {
                await deleteDoc(doc(this.cartCol, cartItem.id));
                return true;
            }
            console.log(`No cart item found with id: ${id}`);
            return false;
        } catch (error) {
            console.error("Error removing cart item: ", error);
            return false;
        }
    }

}

export default CartService;