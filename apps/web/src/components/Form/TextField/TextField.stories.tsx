import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./index";

const meta = {
	title: "Form/TextField",
	component: TextField,
	args: {
		name: "title",
		label: "タイトル",
		placeholder: "タイトルを入力",
		value: "",
		onChange: () => {},
		onBlur: () => {},
		required: false,
		disabled: false,
	},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "サンプルタイトル",
	},
};

export const WithError: Story = {
	args: {
		errorText: "必須項目です",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "編集不可",
	},
};
