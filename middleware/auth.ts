export default defineNuxtRouteMiddleware(async (to) => {
  const isAdmin = to.path.startsWith('/admin')
  const isAuthPage = to.path === '/admin/auth'

  // Non-admin routes: skip so we never load Firebase Auth (avoids auth/iframe.js on homepage LCP)
  if (!isAdmin) return

  // Server: no Firebase auth state; require login for any admin route except auth page
  if (import.meta.server) {
    if (!isAuthPage) return navigateTo('/admin/auth')
    return
  }

  // Client admin only: load Auth SDK only when needed (dynamic import keeps it out of main bundle)
  const { getAuth } = await import('firebase/auth')
  const nuxtApp = useNuxtApp()
  const app = nuxtApp.$firebaseApp as import('firebase/app').FirebaseApp
  const auth = getAuth(app)
  const user = await new Promise<import('firebase/auth').User | null>((resolve) => {
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
