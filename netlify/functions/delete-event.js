// netlify/functions/delete-event.js
const axios = require('axios');
const { verifyAdminToken } = require('./utils/auth'); // Path to your auth helper

exports.handler = async (event, context) => {
    // 1. Method check
    if (event.httpMethod !== 'DELETE') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 2. AUTHENTICATION: Verify Firebase ID token
    const idToken = event.headers.authorization ? event.headers.authorization.split('Bearer ')[1] : null;
    if (!idToken) {
        console.warn('Authentication failed: No ID token provided.');
        return { statusCode: 401, body: 'Unauthorized: No authentication token provided.' };
    }

    const decodedToken = await verifyAdminToken(idToken);
    if (!decodedToken) {
        console.warn('Authentication failed: Invalid or unauthorized ID token.');
        return { statusCode: 403, body: 'Forbidden: Invalid or unauthorized access.' };
    }
    console.log(`Admin ${decodedToken.email} is attempting to delete an event.`);

    // 3. Extract Prismic Document ID from path
    const documentId = event.path.split('/').pop(); // Assumes URL like /netlify/functions/delete-event/YOUR_DOC_ID

    if (!documentId) {
        console.warn('Delete failed: Prismic Document ID is missing from the URL.');
        return { statusCode: 400, body: 'Bad Request: Prismic Document ID is required for delete.' };
    }

    // 4. Get Prismic API credentials from Netlify Environment Variables
    const { PRISMIC_REPO_NAME, PRISMIC_MANAGEMENT_API_TOKEN } = process.env;

    if (!PRISMIC_REPO_NAME || !PRISMIC_MANAGEMENT_API_TOKEN) {
        console.error('Prismic API credentials are not configured in Netlify environment variables.');
        return { statusCode: 500, body: 'Server configuration error: Prismic API credentials missing.' };
    }

    const PRISMIC_DELETE_API_URL = `https://api.prismic.io/management/v1/documents/${documentId}`;

    try {
        // 5. Send DELETE request to Prismic Management API
        await axios.delete(PRISMIC_DELETE_API_URL, {
            headers: {
                'Authorization': `Token ${PRISMIC_MANAGEMENT_API_TOKEN}`,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Event ${documentId} deleted successfully from Prismic!`,
            }),
        };

    } catch (error) {
        console.error(`Error deleting event ${documentId} in Prismic:`, error.response ? error.response.data : error.message);
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                message: error.response?.data?.message || `Failed to delete event ${documentId} from Prismic. Check logs.`,
            }),
        };
    }
};