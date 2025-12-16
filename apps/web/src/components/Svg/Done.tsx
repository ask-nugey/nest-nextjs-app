import { theme } from "@/styles/theme";
import { getToken } from "@/styles/utils/getToken";

type Props = {
	width?: number;
	height?: number;
	color?: keyof typeof theme.semanticTokens.colors.icon;
};

export const SvgDone = ({
	width = 24,
	height = 24,
	color = "default",
}: Props) => {
	const fill = getToken(theme.semanticTokens.colors.icon[color].value);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<title>完了</title>
			<path
				d="M4,4 C5.0543618,4 5.91816512,4.81587779 5.99451426,5.85073766 L6,6 L6,12 L20,12 C21.0543618,12 21.9181651,12.8158778 21.9945143,13.8507377 L22,14 C22,15.0543618 21.1841222,15.9181651 20.1492623,15.9945143 L20,16 L4,16 C2.9456382,16 2.08183488,15.1841222 2.00548574,14.1492623 L2,14 L2,6 C2,4.8954305 2.8954305,4 4,4 Z"
				fill={fill}
				transform="translate(12 10) rotate(-50) translate(-12 -10)"
			/>
		</svg>
	);
};
