/**
 * When GOOGLE_APPLICATION_CREDENTIALS is not set, nuxt-vuefire does not add the
 * admin plugin, but the auth plugin still runs and calls getAdminAuth(undefined),
 * which triggers getApp() and throws "The default Firebase app does not exist".
 *
 * This plugin runs first and initializes the default Firebase Admin app when
 * credentials are not set, so getApp() returns an app. Real auth operations
 * (e.g. createCustomToken) may still fail until you set GOOGLE_APPLICATION_CREDENTIALS.
 */
import * as admin from 'firebase-admin'

const hasCredentials = typeof process.env.GOOGLE_APPLICATION_CREDENTIALS === 'string' &&
  process.env.GOOGLE_APPLICATION_CREDENTIALS.length > 0

if (!hasCredentials && admin.apps.length === 0) {
  try {
    admin.initializeApp()
  } catch (_) {
    // If initializeApp() throws (e.g. no ADC), the auth plugin will still throw
    // "default app does not exist". User must set GOOGLE_APPLICATION_CREDENTIALS.
  }
}

export default defineNuxtPlugin(() => {})
