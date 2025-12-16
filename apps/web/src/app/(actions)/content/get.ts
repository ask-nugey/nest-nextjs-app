"use server";

import { api } from "@/lib/api/client";
import type { paths } from "@/lib/api/schema.gen";

type GetContentParams = paths["/content/{id}"]["get"]["parameters"]["path"];
export const actionsGetContent = async (id: GetContentParams["id"]) => {
	const { data, error } = await api.GET("/content/{id}", {
		params: {
			path: { id },
		},
	});

	return { data, error };
};
