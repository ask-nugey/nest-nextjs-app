import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { actionsListContents } from "@/app/(actions)/content/list";
import { NavClient } from "@/components/Nav/client";

export const Nav = async () => {
	const queryClient = new QueryClient();

	// Navで使用するコンテンツ一覧をSSR時にプリフェッチ
	await queryClient.prefetchQuery({
		queryKey: ["contents"],
		queryFn: async () => {
			const { data, error } = await actionsListContents();
			if (error) return {};
			return data;
		},
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<Suspense fallback={null}>
				<NavClient />
			</Suspense>
		</HydrationBoundary>
	);
};
