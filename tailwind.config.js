/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
  './views/**/*.ejs', // add this to scan your EJS files
    './public/**/*.html'// add this to scan HTML if needed
    // Add more paths as necessary
  ],
  // ["*.{html,js}"],
  theme: {
    
    extend: {},
  },
  plugins: [],
}

