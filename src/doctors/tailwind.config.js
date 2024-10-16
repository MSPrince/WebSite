/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#104069",
        secondary: "#e4094c",
        background: "#e3f8fb",
        color1: "#b4defb",
        color2: "#e0e8fb",
        color3: "#ddc9fe",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};

