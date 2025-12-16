import type { Meta, StoryObj } from "@storybook/react";
import { SvgDelete } from "@/components/Svg/Delete";
import { SvgEdit } from "@/components/Svg/Edit";
import { Button } from ".";

const meta = {
	title: "UI/Button",
	component: Button,
	args: {
		variant: "fill",
		size: "large",
		color: "primary",
		disabled: false,
		children: "ボタン",
	},
	argTypes: {
		size: {
			control: "select",
			options: ["small", "large", "wide"],
		},
		variant: {
			control: "select",
			options: ["fill", "outline", "icon"],
		},
		color: {
			control: "select",
			options: ["primary", "gray"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "無効",
	},
};

export const GrayFill: Story = {
	args: {
		variant: "fill",
		color: "gray",
		children: "Gray",
	},
};

export const IconEdit: Story = {
	args: {
		variant: "icon",
		children: <SvgEdit />,
		"aria-label": "編集",
	},
};

export const AllSizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 12 }}>
			{(["small", "large", "wide"] as const).map((s) => {
				return (
					<Button key={s} variant="fill" size={s} disabled={args.disabled}>
						{s}
					</Button>
				);
			})}
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 12 }}>
			{(["fill", "outline"] as const).map((v) => (
				<Button key={v} variant={v} size="large">
					{v}
				</Button>
			))}
			<Button variant="icon" aria-label="delete">
				<SvgDelete />
			</Button>
		</div>
	),
};
