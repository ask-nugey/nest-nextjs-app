"use client";

import { useEffect } from "react";
import { css } from "styled-system/css";
import { Button } from "@/components/Button";

type Props = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
	useEffect(() => {
		console.error("Error:", error);
	}, [error]);

	return (
		<div
			className={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				padding: "40px",
				gap: "24px",
			})}
		>
			<h1
				className={css({
					textStyle: "title",
				})}
			>
				エラーが発生しました
			</h1>
			<p
				className={css({
					textStyle: "body",
					textAlign: "center",
					maxWidth: "600px",
				})}
			>
				{error.message || "予期しないエラーが発生しました。"}
			</p>
			<Button variant="fill" size="large" onClick={reset}>
				再試行
			</Button>
		</div>
	);
}
