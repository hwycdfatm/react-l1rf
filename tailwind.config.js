module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				bebas: ['Bebas Neue', 'cursive'],
				noto: ['Noto Sans', 'sans-serif'],
			},
			height: {
				'10v': '10vh',
				'20v': '20vh',
				'30v': '30vh',
				'40v': '40vh',
				'50v': '50vh',
				'60v': '60vh',
				'70v': '70vh',
				'80v': '80vh',
				'90v': '90vh',
				'100v': '100vh',
				'542px': '542px',
			},
			scale: ['responsive', 'hover', 'focus'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
