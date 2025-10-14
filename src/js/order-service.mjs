import FirebaseService from './firebase-service.mjs';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export class OrderService {
    constructor() {
        this.orderCol = collection(this.db, 'orders');
        this.db = FirebaseService.getFirestoreInstance();
    }

    /**
     * Places a new order in the Firestore collection.
     * @async
     * @param {Object} order - The order object to add.
     * @returns {Promise<string|null>} A promise that resolves to the ID of the added order, or null if an error occurred.
     */
    async placeOrder(order) {
        try {
            const docRef = await addDoc(this.orderCol, order);
            return docRef.id;
        } catch (error) {
            console.error("Error placing order: ", error);
            return null;
        }
    }

    /**
     * Retrieves all orders from the Firestore collection.
     * @async
     * @returns {Promise<Array>} A promise that resolves to an array of orders.
     */
    async getAllOrders() {
        try {
            const snapshot = await getDocs(this.orderCol);
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return orders;
        } catch (error) {
            console.error("Error fetching orders: ", error);
            return [];
        }
    }

    /**
     * Finds an order by its ID in the Firestore collection.
     * @async
     * @param {string} id - The ID of the order to find.
     * @returns {Promise<Object|null>} A promise that resolves to the order object if found, or null if not found.
     */
    async findOrderById(id) {
        try {
            const q = query(this.orderCol, where('id', '==', id));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
            console.log(`No order found with id: ${id}`);
            return null;
        } catch (error) {
            console.error("Error finding order by id: ", error);
            return null;
        }
    }

    /**
     * Updates an existing order in the Firestore collection.
     * @async
     * @param {string} id - The ID of the order to update.
     * @param {Object} updatedOrder - The updated order object.
     * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, or false if an error occurred.
     *
     */
    async updateOrder(id, updatedOrder) {
        try {
            const orderDoc = doc(this.db, 'orders', id);
            await updateDoc(orderDoc, updatedOrder);
            return true;
        } catch (error) {
            console.error("Error updating order: ", error);
            return false;
        }
    }

    /**
     * Deletes an order from the Firestore collection.
     * @async
     * @param {string} id - The ID of the order to delete.
     * @return {Promise<boolean>} A promise that resolves to true if the deletion was successful, or false if an error occurred.
     */
    async deleteOrder(id) {
        try {
            const orderDoc = doc(this.db, 'orders', id);
            await deleteDoc(orderDoc);
            return true;
        } catch (error) {
            console.error("Error deleting order: ", error);
            return false;
        }
    }
}

export default OrderService;