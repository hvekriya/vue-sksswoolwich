// plugins/axios-auth.js
export default function ({ $axios, app }, inject) {
  $axios.onRequest(async config => {
    // Check if the request is destined for a Netlify Function endpoint.
    // This typically starts with '/.netlify/functions/' when deployed.
    if (config.url.startsWith('/.netlify/functions/')) {
      const user = app.$fire.auth.currentUser; // Get the currently logged-in Firebase user

      if (user) {
        try {
          // Get the Firebase ID token for the current user
          const idToken = await user.getIdToken();
          // Attach the ID token to the Authorization header
          // The Netlify Function will then verify this token.
          config.headers.common['Authorization'] = `Bearer ${idToken}`;
        } catch (error) {
          console.error('Error getting Firebase ID token:', error);
          // Handle error, e.g., by preventing the request or showing a message
          // For security, you might want to throw an error or redirect here
          // if an ID token cannot be obtained for an intended authenticated request.
          // throw new Error('Authentication token could not be obtained.');
        }
      } else {
        // If there's no authenticated user but a call to a protected function is attempted.
        console.error('Attempted to call a protected Netlify Function without an authenticated Firebase user.');
        // This is a good place to potentially redirect the user to the login page
        // if this scenario occurs when it shouldn't (e.g., if a route guard failed).
        // app.router.push('/admin-dash/auth');
      }
    }
    return config;
  });
}