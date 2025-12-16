"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { components } from "@/lib/api/schema.gen";

const message = "タイトルは1文字以上、50文字以下で入力してください";

export type TitleFormValues = Pick<
	components["schemas"]["UpdateContentDTO"],
	"title"
>;

export const titleFormSchema = z.object({
	title: z
		.string({
			required_error: message,
		})
		.trim()
		.min(1, message)
		.max(50, message),
}) satisfies z.ZodType<TitleFormValues>;

export const useTitleForm = (
	initialTitle: string | null,
	onSubmit: (values: TitleFormValues) => Promise<void>,
) => {
	const form = useForm({
		defaultValues: {
			title: initialTitle || "",
		} satisfies TitleFormValues,
		validators: {
			onSubmit: titleFormSchema,
		},
		onSubmit: async ({ value }) => {
			await onSubmit(value);
		},
	});

	return { form };
};
