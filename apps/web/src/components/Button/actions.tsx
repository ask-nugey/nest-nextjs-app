import { css } from "styled-system/css";
import { SvgCancel } from "@/components/Svg/Cancel";
import { SvgDelete } from "@/components/Svg/Delete";
import { SvgDone } from "@/components/Svg/Done";
import { SvgEdit } from "@/components/Svg/Edit";
import { SvgPlus } from "@/components/Svg/Plus";
import { SvgSave } from "@/components/Svg/Save";
import type { theme } from "@/styles/theme";

type Color = keyof typeof theme.semanticTokens.colors.icon;

type Props = {
	color?: Color;
};

export const EditAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgEdit color={color} />
			Edit
		</div>
	);
};

export const DeleteAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgDelete color={color} />
		</div>
	);
};

export const CancelAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgCancel color={color} />
			Cancel
		</div>
	);
};

export const SaveAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgSave color={color} />
			Save
		</div>
	);
};

export const AddAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgPlus color={color} />
			New Page
		</div>
	);
};

export const DoneAction = ({ color = "default" }: Props) => {
	return (
		<div className={withIconStyle}>
			<SvgDone color={color} />
			Done
		</div>
	);
};

export const withIconStyle = css({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textStyle: "minimum",
	lineHeight: "1",
	"& svg": {
		width: "24px",
		height: "24px",
		flex: "none",
	},
});

export const iconStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"& svg": {
		width: "20px",
		height: "20px",
	},
});
