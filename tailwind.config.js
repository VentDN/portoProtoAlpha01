/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna diambil langsung dari sampel piksel desain asli
        "panel-left": "#533F86",   // ungu panel kiri
        "panel-right": "#5F4C8E",  // ungu panel kanan (sedikit lebih terang)
        "accent-mint": "#3CD17C",  // hijau mint untuk aksen & teks
        "line-teal": "#4FA6A0",    // garis lengkung tipis dekoratif
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
