export default defineAppConfig({
    ui: {
        primary: 'golden',
        gray: 'cool',
        button: {
            default: {
                color: 'primary'
            },
            rounded: 'rounded-full'
        },
        card: {
            rounded: 'rounded-2xl',
            background: 'bg-white/80 dark:bg-gray-900/80',
            divide: 'divide-gray-200/50 dark:divide-gray-800/50',
            ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
            shadow: 'shadow-xl backdrop-blur-md'
        }
    }
})
