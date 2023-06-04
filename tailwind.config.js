/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./resources/css/*.css', './*.html'],
	theme: {
		extend: {
			fontFamily: {
				brand: [
					'poppins',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Noto Sans',
					'sans-serif'
				],
				logo: ['Kaushan Script']
			}
		}
	},
	plugins: []
};
