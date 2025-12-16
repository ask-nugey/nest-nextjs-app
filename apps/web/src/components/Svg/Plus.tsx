import { theme } from "@/styles/theme";
import { getToken } from "@/styles/utils/getToken";

type Props = {
	width?: number;
	height?: number;
	color?: keyof typeof theme.semanticTokens.colors.icon;
};

export const SvgPlus = ({
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
			<title>プラスマーク</title>
			<path
				d="M12,4 C12.5522847,4 13,4.44771525 13,5 L13,11 L19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L13,13 L13,19 C13,19.5522847 12.5522847,20 12,20 C11.4477153,20 11,19.5522847 11,19 L11,13 L5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L11,11 L11,5 C11,4.44771525 11.4477153,4 12,4 Z"
				fill={fill}
			/>
		</svg>
	);
};
