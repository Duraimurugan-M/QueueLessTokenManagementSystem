/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",    // hospital green
        secondary: "#0369a1",  // medical blue
        accent: "#dc2626"      // emergency / alert
      }
    }
  },
  plugins: []
};
