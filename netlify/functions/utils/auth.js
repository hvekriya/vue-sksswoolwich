// netlify/functions/utils/auth.js
const admin = require('firebase-admin');

let firebaseAdminInitialized = false;

/**
 * Initializes the Firebase Admin SDK.
 * This function should be called before any Firebase Admin SDK operations.
 */
function initializeFirebaseAdmin() {
    if (firebaseAdminInitialized) {
        return; // SDK is already initialized
    }
    try {
        // Parse the service account JSON string from the environment variable
        // IMPORTANT: Ensure this env var (FIREBASE_ADMIN_SDK_CONFIG) is set in Netlify
        const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        firebaseAdminInitialized = true;
        console.log('Firebase Admin SDK initialized successfully.');
    } catch (e) {
        console.error('Failed to initialize Firebase Admin SDK:', e.message);
        // Throwing an error is crucial here, as subsequent operations will fail without initialization.
        throw new Error('Firebase Admin SDK initialization failed. Check your FIREBASE_ADMIN_SDK_CONFIG environment variable.');
    }
}

/**
 * Verifies a Firebase ID token received from the client.
 * This function handles token validity and optional authorization checks (e.g., email whitelist).
 *
 * @param {string} token The Firebase ID token (e.g., from Authorization: Bearer <token> header).
 * @returns {Promise<object|null>} The decoded token payload if valid and authorized, otherwise null.
 */
async function verifyAdminToken(token) {
    initializeFirebaseAdmin(); // Ensure the Admin SDK is initialized

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        // --- OPTIONAL: Implement Specific Admin Email Whitelist (Highly Recommended) ---
        // Add a Netlify Environment Variable named ADMIN_EMAIL_WHITELIST
        // e.g., value: "admin@yourdomain.com,anotheradmin@yourdomain.com"
        const adminEmailWhitelist = process.env.ADMIN_EMAIL_WHITELIST;

        if (adminEmailWhitelist) {
            const allowedEmails = adminEmailWhitelist.split(',').map(email => email.trim());
            if (!allowedEmails.includes(decodedToken.email)) {
                console.warn(`Unauthorized: User ${decodedToken.email} is not in the ADMIN_EMAIL_WHITELIST.`);
                return null; // User is authenticated but not authorized via email whitelist
            }
        }

        // --- OPTIONAL: Check for Custom Claims (if you use them for roles) ---
        // If you've set custom claims on your Firebase users (e.g., admin: true)
        // using the Firebase Admin SDK, you can check them here:
        // if (!decodedToken.admin) {
        //     console.warn(`Unauthorized: User ${decodedToken.email} does not have the 'admin' custom claim.`);
        //     return null;
        // }

        console.log(`Successfully verified token for user: ${decodedToken.email} (UID: ${decodedToken.uid})`);
        return decodedToken; // Token is valid and authorized
    } catch (error) {
        // Log different types of Firebase auth errors for debugging
        if (error.code === 'auth/id-token-expired') {
            console.error('Firebase ID token expired.');
        } else if (error.code === 'auth/argument-error') {
            console.error('Firebase ID token is malformed or invalid.');
        } else {
            console.error('Firebase ID token verification failed:', error.message);
        }
        return null; // Token is invalid or verification failed
    }
}

module.exports = {
    verifyAdminToken,
};