const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        "./index.html",  // Add your HTML file
        "./src/**/*.{js,jsx,ts,tsx}",  // Add other relevant paths
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});