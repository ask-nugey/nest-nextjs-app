"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useEdit = (paramName: "editTitle" | "editBody") => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isEdit = searchParams.get(paramName) === "true";

	const handleEdit = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(paramName, "true");
		router.push(`${pathname}?${params.toString()}`);
	};

	const handleCancel = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(paramName);
		const newUrl = params.toString()
			? `${pathname}?${params.toString()}`
			: pathname || "/";
		router.push(newUrl);
	};

	const onSaveSuccess = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(paramName);
		const newUrl = params.toString()
			? `${pathname}?${params.toString()}`
			: pathname || "/";
		router.refresh();
		router.push(newUrl);
	};

	return {
		isEdit,
		handleEdit,
		handleCancel,
		onSaveSuccess,
	};
};
