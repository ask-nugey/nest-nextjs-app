"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useContent } from "@/hooks/content";

const newContentSchema = z.object({
	id: z.string(), // 一時的なID（key用）
	title: z.string(),
	body: z.string(),
});

const editFormSchema = z.object({
	selectedIds: z.array(z.number()).min(0),
	newContents: z.array(newContentSchema).min(0),
});

export type EditFormValues = z.infer<typeof editFormSchema>;
export type NewContent = z.infer<typeof newContentSchema>;

export const useEditForm = (
	initialIds: number[],
	onEditComplete?: () => void,
) => {
	const router = useRouter();
	const { deleteMutation, postMutation } = useContent();

	const form = useForm({
		defaultValues: {
			selectedIds: initialIds,
			newContents: [] as NewContent[],
		} satisfies EditFormValues,
		validators: {
			onSubmit: ({ value }) => {
				const result = editFormSchema.safeParse(value);
				if (!result.success) {
					return result.error.errors[0]?.message;
				}
				return undefined;
			},
		},
		onSubmit: async ({ value }) => {
			try {
				// 削除と作成を並列実行
				await Promise.all([
					// 選択されたIDを順番に削除
					...value.selectedIds.map((id) => deleteMutation.mutateAsync([id])),

					// 新規作成予定のコンテンツを作成
					...value.newContents.map((content) =>
						postMutation.mutateAsync([
							// タイトルが空白の場合は「（タイトルなし）」に変換
							content.title.trim() || "（タイトルなし）",
							content.body,
						]),
					),
				]);

				// 削除・作成後にNavを更新
				router.refresh();

				// コールバックを実行（contents再取得など）
				onEditComplete?.();
			} catch (error) {
				console.error("🔥 Failed to edit contents:", error);
				throw error;
			}
		},
	});

	return form;
};
