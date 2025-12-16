import {
	defineSemanticTokens,
	defineTextStyles,
	defineTokens,
} from "@pandacss/dev";

export const theme = {
	tokens: defineTokens({
		colors: {
			gray: {
				900: { value: "#0F172A" },
				800: { value: "#333333" },
				700: { value: "#4D4D4D" },
				600: { value: "#808080" },
				500: { value: "#999999" },
				400: { value: "#B3B3B3" },
				300: { value: "#CCCCCC" },
				200: { value: "#D9D9D9" },
				100: { value: "#E6E6E6" },
				75: { value: "#F5F8FA" },
				50: { value: "#F6F8FA" },
			},
			blue: {
				600: { value: "#347CAB" },
				500: { value: "#3C8EC4" },
				300: { value: "#4CB3F8" },
				100: { value: "#C8E6FA" },
			},
			white: { value: "#FFFFFF" },
			black: { value: "#000000" },
		},
		fonts: {
			default: { value: "'Noto Sans JP', sans-serif" },
		},
		fontSizes: {
			lg: { value: "24px" },
			md: { value: "16px" },
			sm: { value: "12px" },
			xs: { value: "10px" },
		},
		fontWeights: {
			regular: { value: "400" },
			bold: { value: "700" },
		},
		lineHeights: {
			tight: { value: "40px" },
		},
	}),
	semanticTokens: defineSemanticTokens({
		colors: {
			brand: {
				primary: { value: "{colors.blue.300}" },
			},
			text: {
				default: { value: "{colors.gray.900}" },
				primary: { value: "{colors.blue.300}" },
			},
			button: {
				primary: { value: "{colors.blue.300}" },
				primaryHover: { value: "{colors.blue.500}" },
				primaryActive: { value: "{colors.blue.600}" },
				white: { value: "{colors.white}" },
				whiteHover: { value: "{colors.gray.300}" },
				whiteActive: { value: "{colors.gray.400}" },
				whiteBorder: { value: "{colors.blue.300}" },
				lightWhiteHover: { value: "{colors.gray.75}" },
				lightWhiteActive: { value: "{colors.gray.100}" },
				gray: { value: "{colors.gray.400}" },
				grayHover: { value: "{colors.gray.500}" },
				grayActive: { value: "{colors.gray.600}" },
				// transparent: { value: "" },
				transparentHover: { value: "{colors.gray.100}" },
				transparentActive: { value: "{colors.gray.300}" },
			},
			background: {
				primary: { value: "{colors.blue.300}" },
				white: { value: "{colors.white}" },
				lightGray: { value: "{colors.gray.75}" },
			},
			icon: {
				default: { value: "{colors.white}" },
				primary: { value: "{colors.blue.300}" },
				gray: { value: "{colors.gray.400}" },
			},
			border: {
				primary: { value: "{colors.blue.300}" },
			},
		},
	}),
	extend: {
		textStyles: defineTextStyles({
			title: {
				value: {
					fontFamily: "{fonts.default}",
					fontSize: "{fontSizes.lg}",
					fontWeight: "{fontWeights.bold}",
					letterSpacing: "0",
				},
			},
			body: {
				value: {
					fontFamily: "{fonts.default}",
					fontSize: "{fontSizes.md}",
					fontWeight: "{fontWeights.regular}",
					letterSpacing: "0",
				},
			},
			caption: {
				value: {
					fontFamily: "{fonts.default}",
					fontSize: "{fontSizes.sm}",
					fontWeight: "{fontWeights.regular}",
					letterSpacing: "0",
				},
			},
			minimum: {
				value: {
					fontFamily: "{fonts.default}",
					fontSize: "{fontSizes.xs}",
					fontWeight: "{fontWeights.regular}",
					letterSpacing: "0",
				},
			},
		}),
	},
};
