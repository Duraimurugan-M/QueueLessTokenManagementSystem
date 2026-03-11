/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e", // teal primary
        secondary: "#1e293b", // dark slate
        accent: "#10b981", // emerald accent
        background: "#f9fafb" // light gray background
      }
    }
  },
  plugins: []
};
