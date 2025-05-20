/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				indexBackground: '#13151a',
				primary: '#bb3fff',
				secondary: '#84cae7',
				accent: '#bca8ff',
			}
		},
  },
  plugins: [],
};