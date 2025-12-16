import { theme } from "@/styles/theme";
import { getToken } from "@/styles/utils/getToken";

type Props = {
	width?: number;
	height?: number;
	color?: keyof typeof theme.semanticTokens.colors.icon;
};

export const SvgEdit = ({
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
			<title>編集</title>
			<path
				d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z"
				fill={fill}
			/>
		</svg>
	);
};
