// netlify/functions/update-event.js
const axios = require('axios');
const { verifyAdminToken } = require('./utils/auth'); // Path to your auth helper

exports.handler = async (event, context) => {
    // 1. Method check
    if (event.httpMethod !== 'PUT') {
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
    console.log(`Admin ${decodedToken.email} is attempting to update an event.`);

    // 3. Extract Prismic Document ID from path
    const documentId = event.path.split('/').pop(); // Assumes URL like /netlify/functions/update-event/YOUR_DOC_ID

    if (!documentId) {
        console.warn('Update failed: Prismic Document ID is missing from the URL.');
        return { statusCode: 400, body: 'Bad Request: Prismic Document ID is required for update.' };
    }

    // 4. Get Prismic API credentials from Netlify Environment Variables
    const { PRISMIC_REPO_NAME, PRISMIC_MANAGEMENT_API_TOKEN } = process.env;

    if (!PRISMIC_REPO_NAME || !PRISMIC_MANAGEMENT_API_TOKEN) {
        console.error('Prismic API credentials are not configured in Netlify environment variables.');
        return { statusCode: 500, body: 'Server configuration error: Prismic API credentials missing.' };
    }

    const PRISMIC_UPDATE_API_URL = `https://api.prismic.io/management/v1/documents/${documentId}`;

    try {
        const body = JSON.parse(event.body);

        // Prepare the updated document data
        const documentData = {
            // For updates, you only send the 'data' object and not the 'type'
            data: {
                event_date: { type: 'Date', value: body.event_date },
                event_title: { type: 'StructuredText', value: body.event_title_richtext },
                poster: { type: 'Image', value: body.poster_image },
                event_description_short: { type: 'StructuredText', value: body.event_description_short_richtext },
            },
        };

        // 5. Send PUT request to Prismic Management API
        const response = await axios.put(PRISMIC_UPDATE_API_URL, documentData, {
            headers: {
                'Authorization': `Token ${PRISMIC_MANAGEMENT_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Event ${documentId} updated successfully in Prismic!`,
                data: response.data,
            }),
        };

    } catch (error) {
        console.error(`Error updating event ${documentId} in Prismic:`, error.response ? error.response.data : error.message);
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                message: error.response?.data?.message || `Failed to update event ${documentId} in Prismic. Check logs.`,
            }),
        };
    }
};