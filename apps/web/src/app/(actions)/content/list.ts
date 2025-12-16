"use server";
import { api } from "@/lib/api/client";

export const actionsListContents = async () => {
	const { data, error } = await api.GET("/content");
	return { data, error };
};
