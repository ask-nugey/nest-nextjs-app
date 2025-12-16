import { sva } from "styled-system/css";

export const textareaField = sva({
	slots: ["root", "label", "required", "textarea", "error"],
	base: {
		root: { display: "grid", gap: "8px" },
		label: { textStyle: "label", color: "text.default" },
		required: { marginLeft: "4px", color: "semantic.error" },
		textarea: {
			width: "100%",
			padding: "12px",
			textStyle: "body",
			color: "text.default",
			border: "1px solid",
			borderRadius: "6px",
			resize: "vertical",
			transition: "all 0.2s ease",
			_focus: {
				outline: "2px solid",
				outlineColor: "brand.primary",
				borderColor: "brand.primary",
			},
		},
		error: { textStyle: "caption", color: "semantic.error" },
	},
	variants: {
		error: {
			true: { textarea: { borderColor: "semantic.error" } },
			false: { textarea: { borderColor: "border.primary" } },
		},
		disabled: {
			true: { textarea: { backgroundColor: "gray.100" } },
			false: { textarea: { backgroundColor: "background.white" } },
		},
	},
	defaultVariants: {
		error: false,
		disabled: false,
	},
});
