export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useCurrentUser()

    // Wait for the user to be loaded (if any)
    if (process.client) {
        const { $auth } = useNuxtApp()
        // Small delay to ensure firebase is initialized
        await new Promise(resolve => {
            const unsubscribe = $auth.onAuthStateChanged((user) => {
                unsubscribe()
                resolve(user)
            })
        })
    }

    if (!user.value && to.path.startsWith('/admin') && to.path !== '/admin/auth') {
        return navigateTo('/admin/auth')
    }

    if (user.value && to.path === '/admin/auth') {
        return navigateTo('/admin')
    }
})
