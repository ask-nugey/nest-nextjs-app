"use client";

import { Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { css } from "styled-system/css";
import { NAV_EDIT_PARAM } from "@/components/Nav/constant";
import { EditButtons } from "@/components/Nav/EditButtons";
import { EmptyState } from "@/components/Nav/EmptyState";
import { NavItem } from "@/components/Nav/NavItem";
import { useEditForm } from "@/components/Nav/useEditForm";
import { useContent } from "@/hooks/content";

export const NavClient = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const isEdit = searchParams.get(NAV_EDIT_PARAM) === "true";
	const { listQuery } = useContent();
	const { data: contents, error } = listQuery;
	const isLoading = listQuery.isLoading;
	const isError = listQuery.isError;

	const form = useEditForm([]);

	// 編集モードが終了した時にフォームをリセット
	useEffect(() => {
		if (!isEdit) {
			form.reset();
		}
	}, [isEdit, form]);

	const handleAdd = () => {
		const currentNewContents = form.state.values.newContents;
		const newId = `temp-${Date.now()}-${Math.random()}`;
		form.setFieldValue("newContents", [
			...currentNewContents,
			{ id: newId, title: "", body: "" },
		]);
	};

	const handleDone = async () => {
		await form.handleSubmit();
		// フォームをリセットして、URLからisEditパラメータを削除して遷移
		form.reset();
		const doneParams = new URLSearchParams(searchParams.toString());
		doneParams.delete(NAV_EDIT_PARAM);
		const doneUrl = doneParams.toString()
			? `${pathname}?${doneParams.toString()}`
			: pathname || "/";
		router.push(doneUrl);
	};

	return (
		<div
			className={css({
				display: "grid",
				gridTemplateRows: "1fr auto",
			})}
		>
			<nav
				data-testid="nav"
				className={css({
					md: {
						paddingLeft: "40px",
					},
					mdDown: {
						padding: "16px",
					},
				})}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<div
						className={css({
							position: "relative",
						})}
					>
						<ul
							className={css({
								display: "flex",
								flexDirection: "column",
								gap: "1px",
							})}
						>
							{!isError && !isLoading && (
								<>
									{/* コンテンツがない場合 */}
									{contents?.length === 0 && !isEdit && <EmptyState />}

									{/* コンテンツがない場合（編集モード） */}
									{contents?.length === 0 && isEdit && (
										<EmptyState onAdd={handleAdd} />
									)}

									{/* コンテンツ表示 */}
									{contents?.map((content) => (
										<NavItem
											key={content.id}
											id={content.id}
											isEdit={isEdit}
											title={content.title || ""}
											form={form}
										/>
									))}

									{/* コンテンツ表示（編集モード） */}
									{isEdit && (
										<form.Field name="newContents">
											{(field) =>
												field.state.value.map(
													(
														newContent: {
															id: string;
															title: string;
															body: string;
														},
														index: number,
													) => (
														<NavItem
															key={newContent.id}
															title=""
															isEdit
															form={form}
															isNew={true}
															newContentIndex={index}
														/>
													),
												)
											}
										</form.Field>
									)}
								</>
							)}
						</ul>
						{/* エラー時メッセージ */}
						{!isLoading && isError && (
							<li
								className={css({
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									padding: "40px 20px",
									gap: "16px",
									color: "red",
									textStyle: "body",
								})}
							>
								<p>エラーが発生しました</p>
								{error && (
									<p
										className={css({
											textStyle: "caption",
											color: "text.secondary",
										})}
									>
										{error.message}
									</p>
								)}
							</li>
						)}

						{/* ローディングオーバーレイ */}
						{isLoading && !isError && (
							<div
								className={css({
									position: "absolute",
									inset: 0,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "rgba(255,255,255,0.6)",
								})}
							>
								<Spin size="large" />
							</div>
						)}
					</div>
				</form>
			</nav>

			<div
				className={css({
					position: "sticky",
					bottom: "0",
				})}
			>
				<EditButtons
					onDone={handleDone}
					onAdd={handleAdd}
					isError={isError}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};
