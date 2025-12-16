"use client";

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cx } from "styled-system/css";
import { textField } from "./style";

type Props = Omit<ComponentPropsWithoutRef<"input">, "onChange" | "onBlur"> & {
	label?: string;
	errorText?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	"data-testid"?: string; // NOTE: テスト用に追加
};

export const TextField = forwardRef<HTMLInputElement, Props>(
	(
		{
			type = "text",
			label,
			errorText,
			onChange,
			onBlur,
			className,
			...inputProps
		},
		ref,
	) => {
		const styles = textField({
			error: Boolean(errorText),
			disabled: Boolean(inputProps.disabled),
		});

		return (
			<label className={cx(styles.root, className)}>
				{label && (
					<span className={styles.label}>
						{label}
						{inputProps.required && <span className={styles.required}>*</span>}
					</span>
				)}

				<input
					ref={ref}
					{...inputProps}
					type={type}
					onChange={(e) => onChange?.(e.target.value)}
					onBlur={() => onBlur?.()}
					className={styles.input}
				/>

				{errorText && (
					<p role="alert" className={styles.error}>
						{errorText}
					</p>
				)}
			</label>
		);
	},
);
