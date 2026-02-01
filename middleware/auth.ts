import { getAuth, type User } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const isAdmin = to.path.startsWith('/admin')
  const isAuthPage = to.path === '/admin/auth'

  // Server: no Firebase auth state; require login for any admin route except auth page
  if (import.meta.server) {
    if (isAdmin && !isAuthPage) {
      return navigateTo('/admin/auth')
    }
    return
  }

  // Client: wait for Firebase auth state then decide
  const nuxtApp = useNuxtApp()
  const app = nuxtApp.$firebaseApp as import('firebase/app').FirebaseApp
  const auth = getAuth(app)
  const user = await new Promise<User | null>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      unsubscribe()
      resolve(u)
    })
  })

  if (!user && isAdmin && !isAuthPage) {
    return navigateTo('/admin/auth')
  }
  if (user && isAuthPage) {
    return navigateTo('/admin')
  }
})
