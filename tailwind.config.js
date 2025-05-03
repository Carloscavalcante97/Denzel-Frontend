/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      colors: {
        'azul-escuro': '#1D1933', 
      },
      textColor: {
        'hover-gradient': 'linear-gradient(90deg, #43A3D5 0%, #9C60DA 100%)',
        
      },
    },
  },
  plugins: [],
}

