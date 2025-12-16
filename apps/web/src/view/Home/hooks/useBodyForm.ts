"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { components } from "@/lib/api/schema.gen";

const message = "本文は10文字以上、2000文字以下で入力してください";

export type BodyFormValues = Pick<
	components["schemas"]["UpdateContentDTO"],
	"body"
>;

export const bodyFormSchema = z.object({
	body: z
		.string({
			required_error: message,
		})
		.trim()
		.min(10, message)
		.max(2000, message),
}) satisfies z.ZodType<BodyFormValues>;

export const useBodyForm = (
	initialBody: string | null,
	onSubmit: (values: BodyFormValues) => Promise<void>,
) => {
	const form = useForm({
		defaultValues: {
			body: initialBody || "",
		} satisfies BodyFormValues,
		validators: {
			onSubmit: bodyFormSchema,
		},
		onSubmit: async ({ value }) => {
			await onSubmit(value);
		},
	});

	return { form };
};
