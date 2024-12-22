/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
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

