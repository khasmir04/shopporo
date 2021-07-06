module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0187cc',
          DEFAULT: '#0187cc',
          dark: '#0187cc',
        },
        secondary: {
          light: '#34d399',
          DEFAULT: '#34d399',
          dark: '#34d399',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
