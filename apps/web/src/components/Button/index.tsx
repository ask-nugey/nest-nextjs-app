import { cva, cx } from "styled-system/css";
import { token } from "styled-system/tokens";

type Props = React.ComponentProps<"button"> & {
	disabled?: boolean;
	size?: "small" | "large" | "wide";
	children: React.ReactNode;
} & (
		| {
				variant?: "fill";
				color?: "primary" | "gray";
		  }
		| {
				variant?: "outline";
				color?: "primary";
		  }
		| {
				variant?: "icon";
				color?: undefined;
				size?: undefined;
		  }
	);

export const Button = ({
	variant = "fill",
	size = "large",
	color = "primary",
	disabled,
	...props
}: Props) => {
	const buttonSize = variant === "icon" ? "icon" : size;
	return (
		<button
			{...props}
			className={cx(
				styles({ variant, size: buttonSize, color, disabled }),
				props.className,
			)}
		>
			{props.children}
		</button>
	);
};

const styles = cva({
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "40px",
		fontWeight: "bold",
		color: "white",
		backgroundColor: "brand.primary",
		borderRadius: "4px",
		cursor: "pointer",
		transition: "background-color 0.2s ease-in-out",
		_hover: {
			backgroundColor: "button.primaryHover",
		},
	},
	variants: {
		variant: {
			fill: {},
			outline: {
				backgroundColor: "white",
				border: "2px solid",
			},
			icon: {
				height: "24px",
				backgroundColor: "transparent",
				_hover: {
					backgroundColor: "button.transparentHover",
				},
				_active: {
					backgroundColor: "button.transparentActive",
				},
				"& svg path": {
					fill: token("colors.icon.gray"),
				},
			},
		},
		size: {
			small: {
				minWidth: "40px",
			},
			large: {
				minWidth: "90px",
			},
			wide: {
				width: "100%",
			},
			icon: {
				minWidth: "24px",
			},
		},
		color: {
			primary: {},
			gray: {},
		},
		disabled: {
			true: {
				opacity: 0.5,
				pointerEvents: "none",
			},
		},
	},
	compoundVariants: [
		{
			variant: "fill",
			color: "primary",
			css: {
				backgroundColor: "button.primary",
				_hover: {
					backgroundColor: "button.primaryHover",
				},
				_active: {
					backgroundColor: "button.primaryActive",
				},
			},
		},
		{
			variant: "fill",
			color: "gray",
			css: {
				backgroundColor: "button.gray",
				_hover: {
					backgroundColor: "button.grayHover",
				},
				_active: {
					backgroundColor: "button.grayActive",
				},
			},
		},
		{
			variant: "outline",
			color: "primary",
			css: {
				borderColor: "button.whiteBorder",
				color: "text.primary",
				_hover: {
					backgroundColor: "button.whiteHover",
				},
				_active: {
					backgroundColor: "button.whiteActive",
				},
			},
		},
	],
});
