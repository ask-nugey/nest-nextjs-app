import type { Meta, StoryObj } from "@storybook/react";
import { TextareaField } from "./index";

const meta = {
	title: "Form/TextareaField",
	component: TextareaField,
	args: {
		name: "body",
		label: "本文",
		placeholder: "本文を入力",
		value: "",
		onChange: () => {},
		onBlur: () => {},
		required: false,
		disabled: false,
		rows: 6,
	},
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "本文サンプル",
	},
};

export const WithError: Story = {
	args: {
		errorText: "10文字以上で入力してください",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "編集不可",
	},
};
