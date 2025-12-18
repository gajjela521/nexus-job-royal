/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                royal: {
                    950: '#020617', // Deep background
                    900: '#0f172a', // Panel background
                    800: '#1e293b', // Lighter panel
                },
                accent: {
                    gold: '#fbbf24',
                    amber: '#d97706',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
