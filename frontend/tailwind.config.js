/** @type {import('tailwindcss').Config} */
// Keeping this file empty/minimal for v4 if not strictly needed or relying on CSS-first config.
// Actually v4 recommends moving config to CSS. But for safety I'll leave the content array.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '2.5': '0.625rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      colors: {
        primary: '#007AFF',
        accent: '#007AFF',
        dark: '#1A1A1A',
        muted: '#6B7280',
        background: '#F9F9F9',
        surface: '#FFFFFF',
        border: '#E5E5E5',
      },
      boxShadow: {
        'custom': '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
