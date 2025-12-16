"use client";

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cx } from "styled-system/css";
import { textareaField } from "./style";

type Props = Omit<
	ComponentPropsWithoutRef<"textarea">,
	"onChange" | "onBlur"
> & {
	label?: string;
	errorText?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	"data-testid"?: string; // NOTE: テスト用に追加
};

export const TextareaField = forwardRef<HTMLTextAreaElement, Props>(
	({ rows = 6, label, errorText, onChange, onBlur, className, ...textareaProps }, ref) => {
		const styles = textareaField({
			error: Boolean(errorText),
			disabled: Boolean(textareaProps.disabled),
		});

		return (
			<label className={cx(styles.root, className)}>
				{label && (
					<span className={styles.label}>
						{label}
						{textareaProps.required && <span className={styles.required}>*</span>}
					</span>
				)}

				<textarea
					ref={ref}
					{...textareaProps}
					rows={rows}
					onChange={(e) => onChange?.(e.target.value)}
					onBlur={() => onBlur?.()}
					className={styles.textarea}
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
