
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0ea5e9", // Sky Blue
                secondary: "#10b981", // Emerald Green
                danger: "#f43f5e", // Rose Red
                warning: "#f59e0b", // Amber Orange
                neutral: "#64748b", // Slate Grey
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
