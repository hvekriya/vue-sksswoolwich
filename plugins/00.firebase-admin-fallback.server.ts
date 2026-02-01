/**
 * When GOOGLE_APPLICATION_CREDENTIALS is not set, nuxt-vuefire does not add the
 * admin plugin, but the auth plugin still runs and calls getAdminAuth(undefined),
 * which triggers getApp() and throws "The default Firebase app does not exist".
 *
 * This plugin runs first and initializes the default Firebase Admin app using
 * FIREBASE_ADMIN_SDK_CONFIG (JSON string) if available, or falls back to
 * Application Default Credentials (ADC).
 */
import * as admin from 'firebase-admin'

const hasGoogleCredentials = typeof process.env.GOOGLE_APPLICATION_CREDENTIALS === 'string' &&
  process.env.GOOGLE_APPLICATION_CREDENTIALS.length > 0

const hasFirebaseAdminConfig = typeof process.env.FIREBASE_ADMIN_SDK_CONFIG === 'string' &&
  process.env.FIREBASE_ADMIN_SDK_CONFIG.length > 0

if ((admin.apps?.length ?? 0) === 0) {
  try {
    if (hasFirebaseAdminConfig && !hasGoogleCredentials) {
      // Parse the JSON service account config from env var
      const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG!)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } else if (!hasGoogleCredentials) {
      // Fall back to ADC or empty init
      admin.initializeApp()
    }
    // If hasGoogleCredentials is true, nuxt-vuefire will handle initialization
  } catch (_) {
    // If initializeApp() throws, suppress the error here.
    // The auth plugin may still throw if it requires admin functionality.
  }
}

export default defineNuxtPlugin(() => {})
