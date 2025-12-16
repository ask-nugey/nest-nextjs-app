import { redirect } from "next/navigation";
import { actionsListContents } from "@/app/(actions)/content/list";

export default async function PageHome() {
	const { data, error } = await actionsListContents();

	if (!error && data && data.length > 0) {
		redirect(`/${data[0].id}`);
	}

	return <div>コンテンツが見つかりませんでした</div>;
}
