// netlify/functions/create-event.js
const axios = require('axios');
const { verifyAdminToken } = require('./utils/auth'); // Path to your auth helper

exports.handler = async (event, context) => {
    // 1. Method check
    if (event.httpMethod !== 'POST') {
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
    // At this point, the user is authenticated and authorized.
    console.log(`Admin ${decodedToken.email} is attempting to create an event.`);

    // 3. Get Prismic API credentials from Netlify Environment Variables
    const { PRISMIC_REPO_NAME, PRISMIC_MANAGEMENT_API_TOKEN } = process.env;

    if (!PRISMIC_REPO_NAME || !PRISMIC_MANAGEMENT_API_TOKEN) {
        console.error('Prismic API credentials are not configured in Netlify environment variables.');
        return { statusCode: 500, body: 'Server configuration error: Prismic API credentials missing.' };
    }

    const PRISMIC_MANAGEMENT_API_URL = `https://api.prismic.io/management/v1/repositories/${PRISMIC_REPO_NAME}/documents`;

    try {
        const body = JSON.parse(event.body);

        // Prepare the document data in Prismic's Management API format
        const documentData = {
            type: 'event', // This should match your Prismic Custom Type API ID
            data: {
                event_date: {
                    type: 'Date',
                    value: body.event_date,
                },
                event_title: {
                    type: 'StructuredText',
                    value: body.event_title_richtext, // Expects Prismic Rich Text JSON array
                },
                poster: {
                    type: 'Image',
                    value: body.poster_image, // Expects { url: '...', alt: '...', copyright: '...' }
                },
                event_description_short: {
                    type: 'StructuredText',
                    value: body.event_description_short_richtext, // Expects Prismic Rich Text JSON array
                },
            },
        };

        // 4. Send request to Prismic Management API
        const response = await axios.post(PRISMIC_MANAGEMENT_API_URL, documentData, {
            headers: {
                'Authorization': `Token ${PRISMIC_MANAGEMENT_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Event created successfully in Prismic!',
                data: response.data, // Contains Prismic's response, e.g., document ID, UID
            }),
        };

    } catch (error) {
        console.error('Error creating event in Prismic:', error.response ? error.response.data : error.message);
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                message: error.response?.data?.message || 'Failed to create event in Prismic. Check logs.',
            }),
        };
    }
};