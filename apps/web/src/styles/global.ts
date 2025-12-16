import { css } from "styled-system/css";

export const globalStyles = css({
	fontFamily: '"Noto Sans JP", sans-serif',
	margin: 0,
	"& *": {
		boxSizing: "border-box",
		padding: 0,
		margin: 0,
	},
	"& a": {
		color: "inherit",
		textDecoration: "none",
	},
});
