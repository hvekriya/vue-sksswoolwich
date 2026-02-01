export const useScrollToTop = () => {
    const scrollToTop = () => {
        if (import.meta.client) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    return {
        scrollToTop
    }
}
