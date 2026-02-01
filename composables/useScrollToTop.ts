export const useScrollToTop = () => {
  const scrollToTop = () => {
    if (import.meta.client) {
      const el = document.getElementById('app-scroll')
      if (el) {
        el.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }
  }

  return {
    scrollToTop
  }
}
