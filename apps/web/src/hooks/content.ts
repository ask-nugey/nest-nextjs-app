"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actionsDeleteContent } from "@/app/(actions)/content/delete";
import { actionsGetContent } from "@/app/(actions)/content/get";
import { actionsListContents } from "@/app/(actions)/content/list";
import { actionsPostContent } from "@/app/(actions)/content/post";
import { actionsPutContent } from "@/app/(actions)/content/put";

export const useContent = (id?: number) => {
	const queryClient = useQueryClient();

	const getQuery = useQuery({
		queryKey: ["content", id],
		enabled: !!id,
		queryFn: async () => {
			if (!id) throw new Error("IDが指定されていません。");

			const { data, error } = await actionsGetContent(id);
			if (error) throw new Error(error);
			return data;
		},
	});

	const listQuery = useQuery({
		queryKey: ["contents"],
		queryFn: async () => {
			const { data, error } = await actionsListContents();
			if (error) throw new Error(error);
			return data;
		},
	});

	const postMutation = useMutation({
		mutationFn: async (params: Parameters<typeof actionsPostContent>) => {
			const { data, error } = await actionsPostContent(...params);
			if (error) throw new Error(error);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contents"] });
		},
	});

	const putMutation = useMutation({
		mutationFn: async (params: Parameters<typeof actionsPutContent>) => {
			const { data, error } = await actionsPutContent(...params);
			if (error) throw new Error(error);
			return data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["contents"] });
			queryClient.invalidateQueries({ queryKey: ["content", variables[0]] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (params: Parameters<typeof actionsDeleteContent>) => {
			const { data, error } = await actionsDeleteContent(...params);
			if (error) throw new Error(error);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contents"] });
		},
	});

	return {
		getQuery,
		listQuery,
		postMutation,
		putMutation,
		deleteMutation,
	};
};
