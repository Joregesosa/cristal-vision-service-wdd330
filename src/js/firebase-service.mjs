import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Service class for initializing and accessing Firebase services.
 *
 * @class
 * @example
 * const firebaseService = new FirebaseService();
 * const auth = firebaseService.getAuthInstance();
 * const db = firebaseService.getFirestoreInstance();
 */
export class FirebaseService {
    constructor() {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_API_KEY,
            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_APP_ID
        };

        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
    }

    /**
     * Returns the current Firebase Auth instance.
     * @returns {import('firebase/auth').Auth} The Firebase Auth instance.
     */
    getAuthInstance() {
        return this.auth;
    }

    /**
     * Returns the current Firestore database instance.
     * @returns {import('firebase/firestore').Firestore} The Firestore instance.
     */
    getFirestoreInstance() {
        return this.db;
    }
}

export default new FirebaseService();