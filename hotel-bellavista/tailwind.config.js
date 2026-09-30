/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: '#A68445',
        'gold-deep': '#8C6E34',
        ink: '#1A1814',
        cream: '#F6F3EE',
        'dark-gray': '#1A1814',
        'light-gray': '#F6F3EE',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
      },
    },
  },
  plugins: [],
}
