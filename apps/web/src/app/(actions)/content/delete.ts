"use server";

import { api } from "@/lib/api/client";
import type { paths } from "@/lib/api/schema.gen";

type DeleteContentParams =
	paths["/content/{id}"]["delete"]["parameters"]["path"];

export const actionsDeleteContent = async (id: DeleteContentParams["id"]) => {
	const { data, error } = await api.DELETE("/content/{id}", {
		params: {
			path: { id },
		},
	});
	return { data, error };
};
