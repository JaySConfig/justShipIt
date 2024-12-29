/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,js}",  // Look for classes in all .ejs and .js files in views
    "./views/*.{ejs,js}",     // Also look in the root of views
    "./public/**/*.{js,css}"  // And in public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}