import { sva } from "styled-system/css";

export const textField = sva({
	slots: ["root", "label", "required", "input", "error"],
	base: {
		root: { display: "grid", gap: "8px" },
		label: { textStyle: "label", color: "text.default" },
		required: { marginLeft: "4px", color: "semantic.error" },
		input: {
			width: "100%",
			paddingInline: "12px",
			paddingBlock: "10px",
			textStyle: "body",
			color: "text.default",
			border: "1px solid",
			borderRadius: "8px",
			transition: "all 0.2s ease",
			_focus: {
				outline: "1px solid",
				outlineColor: "border.primary",
				borderColor: "border.primary",
			},
		},
		error: { textStyle: "caption", color: "semantic.error" },
	},
	variants: {
		error: {
			true: {
				input: { borderColor: "semantic.error" },
			},
			false: {
				input: { borderColor: "border.primary" },
			},
		},
		disabled: {
			true: { input: { backgroundColor: "gray.100" } },
			false: { input: { backgroundColor: "background.white" } },
		},
	},
	defaultVariants: {
		error: false,
		disabled: false,
	},
});
