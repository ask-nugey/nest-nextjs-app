"use client";

import { css } from "styled-system/css";
import { TextareaField } from "@/components/Form/TextareaField";
import { useContent } from "@/hooks/content";
import type { paths } from "@/lib/api/schema.gen";
import { EditActions } from "@/view/Home/components/EditActions";
import { bodyFormSchema, useBodyForm } from "@/view/Home/hooks/useBodyForm";
import { useEdit } from "@/view/Home/hooks/useEdit";

type UpdateContentParams = paths["/content/{id}"]["put"]["parameters"]["path"];

type Props = UpdateContentParams;

export const Body = (props: Props) => {
	const { getQuery, putMutation } = useContent(props.id);
	const content = getQuery.data;

	const { isEdit, handleEdit, handleCancel, onSaveSuccess } =
		useEdit("editBody");

	const { form } = useBodyForm(content?.body || "", async (values) => {
		putMutation.mutate([props.id, content?.title || "", values.body], {
			onSuccess: () => {
				onSaveSuccess();
			},
		});
	});

	return (
		<form
			data-testid="content-body"
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
					name="body"
					validators={{ onChange: bodyFormSchema.shape.body }}
				>
					{(field) => (
						<TextareaField
							data-testid="body-input"
							name={field.name}
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							placeholder="本文を入力"
							errorText={field.state.meta.errors[0]?.message}
							rows={8}
							className={css({
								"& textarea": { ...titleStyles },
							})}
						/>
					)}
				</form.Field>
			)}

			{!isEdit && (
				<div
					className={css({
						...titleStyles,
						border: "1px solid transparent",
					})}
				>
					<p>{content?.body || ""}</p>
				</div>
			)}

			<EditActions
				isEdit={isEdit}
				onEdit={handleEdit}
				onCancel={handleCancel}
				onSave={() => form.handleSubmit()}
				editButtonTestId="edit-body-button"
			/>
		</form>
	);
};

const titleStyles = css.raw({
	padding: "30px",
	textStyle: "body",
	backgroundColor: "background.white",
	borderRadius: "8px",
	whiteSpace: "pre-wrap",
	mdDown: {
		padding: "16px",
	},
});
