import FirebaseService from './firebase-service.mjs'; 


export class AuthService {
    constructor() {
        this.auth = FirebaseService.getAuthInstance();
        this.db = FirebaseService.getFirestoreInstance();
    }

    /**
     * Registers a new user with email and password.
     *
     * @async 
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<import('firebase/auth').UserCredential|null>} A promise that resolves to the user credential if successful, or null if an error occurred.
     */ 
    async registerUser(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error registering user: ", error);
            return null;
        }
    }
    /**
     * Logs in a user with email and password.
     *
     * @async
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<import('firebase/auth').UserCredential|null>} A promise that resolves to the user credential if successful, or null if an error occurred.
     */
    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error logging in user: ", error);
            return null;
        }
    }

    /**
     * Logs out the current user.
     * @async
     * @returns {Promise<boolean>} A promise that resolves to true if logout was successful, or false if an error occurred.
     */
    async logoutUser() {
        try {
            await signOut(this.auth);
            return true;
        } catch (error) {
            console.error("Error logging out user: ", error);
            return false;
        }
    }
}

export default AuthService;