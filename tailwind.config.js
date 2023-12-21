/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

module.exports = {
	content: ["app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				black: "#171717",
				background: "#FAFAFA",
				hover: "#F4F4F4",
				select: "#EAEAEA",
			},
			fontSize: {
				base: "14px",
			},
			// color for p tag
			textColor: {
				primary: "#050505",
				secondary: "#404040",
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("not-first", "&:not(:last-child)")
		}),
	],
}
