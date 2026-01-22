/** @type {import('tailwindcss').Config} */
// Keeping this file empty/minimal for v4 if not strictly needed or relying on CSS-first config.
// Actually v4 recommends moving config to CSS. But for safety I'll leave the content array.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
