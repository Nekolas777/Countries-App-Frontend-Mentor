/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--primary_accent))',
        custom_bg: 'hsl(var(--custom_bg))',
        custom_bg_accent: 'hsl(var(--custom_bg_accent))',
      },
      fontWeight: {
        custom_weight: 'var(--custom_weight)',
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}

