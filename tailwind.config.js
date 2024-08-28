/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			white: '#FFFFFF',
			brand: {
				DEFAULT: '#E46643',
				light: '#F39765',
			},
			primary: {
				100: '#F5F5F5',
				200: '#E4E4E4',
				300: '#C1C4CB',
				400: '#7C8187',
				500: '#5A6069',
				600: '#35393F',
				700: '#2B2D31',
				800: '#1D1F22',
				900: '#151619',
			},
		},
		extend: {},
	},
	plugins: [],
};
