export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const el = document.getElementById('app-scroll')
    if (el) el.scrollTo({ top: 0, left: 0 })
    else window.scrollTo({ top: 0, left: 0 })
  })
})
