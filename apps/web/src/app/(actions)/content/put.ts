"use server";

import { api } from "@/lib/api/client";
import type { components, paths } from "@/lib/api/schema.gen";

type UpdateContentParams = paths["/content/{id}"]["put"]["parameters"]["path"];
type UpdateContentBody = components["schemas"]["UpdateContentDTO"];

export const actionsPutContent = async (
	id: UpdateContentParams["id"],
	title: UpdateContentBody["title"],
	body: UpdateContentBody["body"],
) => {
	const { data, error } = await api.PUT("/content/{id}", {
		params: {
			path: { id },
		},
		body: { title, body },
	});

	return { data, error };
};
