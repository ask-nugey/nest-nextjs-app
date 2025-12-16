import { PageHomeView } from "@/view/Home";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PageDetail(props: Props) {
	const { id } = await props.params;
	return <PageHomeView id={Number(id)} />;
}
