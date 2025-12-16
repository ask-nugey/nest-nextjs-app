"use server";

import { api } from "@/lib/api/client";
import type { components } from "@/lib/api/schema.gen";

type CreateContentBody = components["schemas"]["CreateContentDTO"];

export const actionsPostContent = async (
	title: CreateContentBody["title"],
	body: CreateContentBody["body"],
) => {
	const { data, error } = await api.POST("/content", {
		body: { title, body },
	});

	return { data, error };
};
