"use client";

import { css } from "styled-system/css";
import { TextField } from "@/components/Form/TextField";
import { useContent } from "@/hooks/content";
import type { paths } from "@/lib/api/schema.gen";
import { EditActions } from "@/view/Home/components/EditActions";
import { useEdit } from "@/view/Home/hooks/useEdit";
import { titleFormSchema, useTitleForm } from "@/view/Home/hooks/useTitleForm";

type UpdateContentParams = paths["/content/{id}"]["put"]["parameters"]["path"];

type Props = UpdateContentParams;

export const Title = (props: Props) => {
	const { getQuery, putMutation } = useContent(props.id);
	const content = getQuery.data;

	const { isEdit, handleEdit, handleCancel, onSaveSuccess } =
		useEdit("editTitle");

	const { form } = useTitleForm(content?.title || "", async (values) => {
		putMutation.mutate([props.id, values.title, content?.body || ""], {
			onSuccess: () => {
				onSaveSuccess();
			},
		});
	});

	return (
		<form
			data-testid="content-title"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className={css({
				md: {
					display: "grid",
					gridTemplateColumns: "1fr auto",
					alignItems: "flex-start",
					gridGap: "20px",
				},
				mdDown: {
					display: "flex",
					flexDirection: "column-reverse",
					gridGap: "8px",
				},
			})}
		>
			{isEdit && (
				<form.Field
					name="title"
					validators={{ onChange: titleFormSchema.shape.title }}
				>
					{(field) => (
						<TextField
							data-testid="title-input"
							name={field.name}
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							placeholder="タイトルを入力"
							errorText={field.state.meta.errors[0]?.message}
							required
							className={css({
								"& input": {
									...titleStyle,
								},
							})}
						/>
					)}
				</form.Field>
			)}

			{!isEdit && (
				<div
					className={css({
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
					})}
				>
					<h1
						className={css({
							...titleStyle,
							border: "1px solid transparent",
						})}
					>
						{content?.title || "（タイトルなし）"}
					</h1>
				</div>
			)}

			<EditActions
				isEdit={isEdit}
				onEdit={handleEdit}
				onCancel={handleCancel}
				onSave={() => form.handleSubmit()}
				editButtonTestId="edit-title-button"
			/>
		</form>
	);
};

const titleStyle = css.raw({
	paddingBlock: "2px",
	paddingInline: "30px",
	textStyle: "title",
	lineHeight: "40px",
	mdDown: {
		paddingInline: "16px",
	},
});
