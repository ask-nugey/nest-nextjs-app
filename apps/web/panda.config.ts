import { defineConfig } from "@pandacss/dev";
import { theme } from "@/styles/theme";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./stories/**/*.{js,jsx,ts,tsx}",
	],

	// Files to exclude
	exclude: [],

	// Design tokens based on the provided color guideline
	theme,

	// The output directory for your css system
	outdir: "styled-system",

	globalCss: {
		body: {
			fontFamily: '"Noto Sans JP", sans-serif',
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
			margin: 0,
			color: "text.default",
		},
		"*": {
			boxSizing: "border-box",
			padding: 0,
			margin: 0,
		},
		a: {
			color: "inherit",
			textDecoration: "none",
		},
	},

	staticCss: {
		css: [
			{
				properties: {
					justifyContent: ["flex-end"],
				},
			},
		],
	},
});
