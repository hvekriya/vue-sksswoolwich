export default {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                golden: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#FCC71D', // Our Primary Gold
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                'temple-red': {
                    50: '#fff1f1',
                    100: '#ffdfdf',
                    200: '#ffc5c5',
                    300: '#ff9d9d',
                    400: '#ff6464',
                    500: '#9b0d02', // Our Accent Red
                    600: '#7d0a02',
                    700: '#610802',
                    800: '#4a0602',
                    900: '#3a0502',
                    950: '#210201',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        }
    }
}
