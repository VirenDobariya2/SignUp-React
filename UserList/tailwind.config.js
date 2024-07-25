/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {backgroundImage: {
      'custom-gradient': 'linear-gradient(#2A00B7, #42006C)',
      'custom-yellow': 'rgba(255, 255, 0, 0.8)',
      
    }},
  },
  plugins: [],
}

