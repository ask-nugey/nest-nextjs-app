"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { css } from "styled-system/css";
import { Button } from "@/components/Button";
import { AddAction, EditAction } from "@/components/Button/actions";
import { NAV_EDIT_PARAM } from "@/components/Nav/constant";

type Props = {
	onAdd?: () => void;
};

export const EmptyState = ({ onAdd }: Props) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const isEdit = searchParams.get(NAV_EDIT_PARAM) === "true";

	return (
		<li
			className={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "40px 20px",
				gap: "16px",
				color: "text.secondary",
				textStyle: "body",
			})}
		>
			<p>コンテンツがありません</p>
			{!isEdit && (
				<Link href={`${pathname}?${NAV_EDIT_PARAM}=true`}>
					<Button variant="fill" size="large">
						<EditAction />
					</Button>
				</Link>
			)}
			{isEdit && onAdd && (
				<>
					<p
						className={css({
							textStyle: "caption",
							color: "text.secondary",
						})}
					>
						編集モードで「New Page」ボタンから新規作成できます
					</p>
					<Button variant="outline" size="large" onClick={onAdd}>
						<AddAction color="primary" />
					</Button>
				</>
			)}
		</li>
	);
};
