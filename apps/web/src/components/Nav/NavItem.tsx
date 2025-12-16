"use client";

import { useStore } from "@tanstack/react-form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "styled-system/css";
import { Button } from "@/components/Button";
import { DeleteAction } from "@/components/Button/actions";
import { TextField } from "@/components/Form/TextField";
import type { NewContent, useEditForm } from "./useEditForm";

type Props = {
	id?: number;
	title: string;
	isEdit?: boolean;
	form: ReturnType<typeof useEditForm>;
	isNew?: boolean;
	newContentIndex?: number;
};

export const NavItem = ({
	id,
	title,
	isEdit = false,
	form,
	isNew = false,
	newContentIndex,
}: Props) => {
	const pathname = usePathname();
	const currentId = pathname?.split("/")[1] || "";
	const isSelected = currentId === id?.toString();
	const adHome = currentId === "";
	const canEdit = isEdit;

	const newContent = (() => {
		if (!form) return;
		if (newContentIndex === undefined) return;

		return form.state.values.newContents[newContentIndex];
	})();

	const isExistingItem = id !== undefined;
	const isNewItem = isNew && newContent;

	const handleDeleteClick = (e: React.MouseEvent) => {
		if (!form) return;

		e.preventDefault();
		e.stopPropagation();
		const currentNewContents: NewContent[] = form.state.values.newContents;
		form.setFieldValue(
			"newContents",
			currentNewContents.filter((_, index) => index !== newContentIndex),
		);
	};

	const handleTitleChange = (value: string) => {
		if (!form) return;
		if (newContentIndex === undefined) return;

		const newContents = [...form.state.values.newContents];
		if (newContents[newContentIndex]) {
			newContents[newContentIndex] = {
				...newContents[newContentIndex],
				title: value,
			};
			form.setFieldValue("newContents", newContents);
		}
	};

	const testId = (() => {
		if (isNewItem) return `nav-item-new-${newContentIndex}`;
		if (id !== undefined) return `nav-item-${id}`;
		return undefined;
	})();

	const isDeletePending = useStore(form.store, (state) =>
		(state.values.selectedIds || []).includes(id ?? -1),
	);

	return (
		<li
			data-testid={testId}
			data-marked-for-delete={isDeletePending ? "true" : "false"}
			className={css({
				containerType: "inline-size",
				display: "flex",
				alignItems: "center",
				gap: "10px",
				width: "100%",

				// トップページでは最初の項目をアクティブ化
				"&:first-child a": { ...(adHome && !isEdit && activeStyle) },
			})}
		>
			{!canEdit && (
				<Link
					href={`/${id?.toString()}`}
					className={css({
						width: "100cqw",
						height: "44px",
						padding: "10px",
						color: "text.default",
						textStyle: "body",
						fontWeight: "regular",
						borderRadius: "4px",
						backgroundColor: "transparent",
						transition: "all 0.2s ease-in-out",

						// 3点リーダー表示
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",

						_hover: {
							backgroundColor: "button.lightWhiteHover",
						},
						_active: {
							backgroundColor: "button.lightWhiteActive",
						},

						// 表示ページの項目をアクティブ化
						...(isSelected && activeStyle),
					})}
				>
					{title || "（タイトルなし）"}
				</Link>
			)}

			{canEdit && isExistingItem && (
				<form.Field name="selectedIds">
					{(field) => {
						const handleToggleDeletePending = (e: React.MouseEvent) => {
							e.preventDefault();
							e.stopPropagation();
							const currentIds: number[] = field.state.value;
							if (currentIds.includes(id)) {
								// 削除予定から外す
								field.handleChange(
									currentIds.filter((selectedId: number) => selectedId !== id),
								);
							} else {
								// 削除予定に追加
								field.handleChange([...currentIds, id]);
							}
						};

						return (
							<div
								className={css({
									display: "flex",
									alignItems: "center",
									gap: "8px",
									width: "100cqw",
									height: "44px",
									padding: "10px",
									borderRadius: "4px",
									backgroundColor: "transparent",
									transition: "all 0.2s ease-in-out",
									opacity: isDeletePending ? 0.5 : 1,
									textDecoration: isDeletePending ? "line-through" : "none",
									_hover: {
										backgroundColor: "button.lightWhiteHover",
									},
								})}
							>
								<Link
									href={`/${id?.toString()}`}
									className={css({
										flex: 1,
										color: "text.default",
										textStyle: "body",
										fontWeight: "regular",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									})}
								>
									{title || "（タイトルなし）"}
								</Link>
								<Button
									data-testid={`nav-delete-button-${id}`}
									variant="icon"
									onClick={handleToggleDeletePending}
								>
									<DeleteAction color="gray" />
								</Button>
							</div>
						);
					}}
				</form.Field>
			)}

			{canEdit && isNewItem && (
				<div
					className={css({
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "10px",
						borderRadius: "4px",
						backgroundColor: "transparent",
						transition: "all 0.2s ease-in-out",
						_hover: {
							backgroundColor: "button.lightWhiteHover",
						},
					})}
				>
					<div
						className={css({
							flex: 1,
						})}
					>
						<TextField
							name={`newContents.${newContentIndex}.title`}
							value={newContent.title || ""}
							onChange={handleTitleChange}
							placeholder="タイトルを入力"
							className={css({
								"& input": {
									textStyle: "body",
									paddingInline: "8px",
								},
							})}
						/>
					</div>
					<Button
						data-testid={`nav-delete-button-new-${newContentIndex}`}
						variant="icon"
						onClick={handleDeleteClick}
					>
						<DeleteAction color="gray" />
					</Button>
				</div>
			)}
		</li>
	);
};

const activeStyle = css.raw({
	color: "text.primary",
	fontWeight: "bold",
	backgroundColor: "button.lightWhiteHover",
});
