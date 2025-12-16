import { css } from "styled-system/css";
import { Button } from "@/components/Button";
import {
	CancelAction,
	EditAction,
	SaveAction,
} from "@/components/Button/actions";

type Props = {
	isEdit: boolean;
	onEdit: () => void;
	onCancel: () => void;
	onSave: () => void;
	editButtonTestId?: string;
};

export const EditActions = ({
	isEdit,
	onEdit,
	onCancel,
	onSave,
	editButtonTestId,
}: Props) => {
	return (
		<div
			className={css({
				display: "flex",
				flex: "none",
				gap: "10px",
			})}
		>
			{isEdit ? (
				<>
					<Button
						data-testid="cancel-button"
						variant="fill"
						size="small"
						color="gray"
						type="button"
						onClick={onCancel}
					>
						<CancelAction />
					</Button>
					<Button
						data-testid="save-button"
						variant="fill"
						size="small"
						type="button"
						onClick={onSave}
					>
						<SaveAction />
					</Button>
				</>
			) : (
				<Button
					data-testid={editButtonTestId}
					variant="fill"
					size="large"
					type="button"
					onClick={onEdit}
				>
					<EditAction />
				</Button>
			)}
		</div>
	);
};
