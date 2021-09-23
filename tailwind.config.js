module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				bebas: ['Bebas Neue', 'cursive'],
				noto: ['Noto Sans', 'sans-serif'],
				maven: ['Maven Pro', 'sans-serif'],
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
				'200v': '200vh',
			},
			width: {
				lg: '542px',
			},

			scale: ['responsive', 'hover', 'focus'],
		},
		backgroundColor: (theme) => ({
			...theme('colors'),
			sidebar: '#D8E3E7',
		}),
	},
	variants: {
		extend: {
			backgroundColor: ['checked'],
			borderColor: ['checked', 'last'],
		},
	},
	plugins: [],
}
