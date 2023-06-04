/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./resources/css/*.css', './*.html'],
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
			}
		}
	},
	plugins: []
};
