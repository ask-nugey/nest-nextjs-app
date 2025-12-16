import { Suspense } from "react";
import { css } from "styled-system/css";
import { actionsGetContent } from "@/app/(actions)/content/get";
import { Body } from "./components/Body";
import { Title } from "./components/Title";

type Props = {
	id: number;
};

export const PageHomeView = async (props: Props) => {
	const { data: content, error } = await actionsGetContent(props.id);

	return (
		<div
			className={css({
				display: "grid",
				gridGap: "20px",
				backgroundColor: "background.lightGray",
				borderRadius: "16px",
				md: {
					padding: "30px",
					marginTop: "30px",
					marginRight: "40px",
				},
				mdDown: {
					padding: "16px",
					margin: "8px",
				},
			})}
		>
			{content && (
				<>
					<Suspense fallback={null}>
						<Title id={props.id} />
					</Suspense>
					<Suspense fallback={null}>
						<Body id={props.id} />
					</Suspense>
				</>
			)}

			{(!content || error) && <p>コンテンツが見つかりませんでした</p>}
		</div>
	);
};
