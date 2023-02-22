/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gaia-light-orange': "#FFC32B",
        'gaia-orange': "#FF9B01",
        'gaia-light-blue': "#96C8F6",
        'gaia-blue': "#1B85E7",
        'gaia-light-purple': "#B3A1E3",
        'gaia-purple': "#8557FF"
      },
    },
  },
  important: true,
  plugins: [],
}

