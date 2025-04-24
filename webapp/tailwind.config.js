/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tj: {
          blue: '#2f6398',   // Juggling & Technology
          green: '#3ea075',  // Juggling & Change
          red: '#b74047',    // Juggling & Your Brain
          sand: '#e2c293',   // Neutral highlights
        },
        primary: '#2f6398',    // tj-blue
        secondary: '#3ea075',  // tj-green
        danger: '#b74047',     // tj-red
      },
    },
  },
  plugins: [],
}
