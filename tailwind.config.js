/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./resources/css/*.css',
		'./pages/*.html',
		'./resources/js/**/*.js',
		'./resources/js/**/*.mjs'
	],
	theme: {
		extend: {
			fontFamily: {
				brand: [
					'poppins',
					'Inter',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Noto Sans',
					'sans-serif'
				],
				logo: ['Kaushan Script']
			},
			boxShadow: {
				'3xl':
					'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
			},

			animation: {
				'slide-down-from-top': 'slideDown 300ms ease-in-out forwards',
				'slide-up-from-bottom': 'slideUp 300ms ease-in-out forwards'
			},

			keyframes: {
				slideDown: {
					'0%': { top: '-5rem', opacity: 0 },
					'70%': { opacity: 1 },
					'100%': { top: '2rem' }
				},
				slideUp: {
					'0%': { top: '2rem', opacity: 1 },
					'100%': { top: '-5rem', opacity: 0 }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
