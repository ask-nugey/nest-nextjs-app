"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { css } from "styled-system/css";
import { Button } from "@/components/Button";
import { AddAction, DoneAction, EditAction } from "@/components/Button/actions";
import { NAV_EDIT_PARAM } from "@/components/Nav/constant";

type Props = {
	onDone?: () => Promise<void>;
	onAdd?: () => void;
	isError?: boolean;
	isLoading?: boolean;
};

export const EditButtons = ({ onDone, onAdd, isError, isLoading }: Props) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const isEdit = searchParams.get(NAV_EDIT_PARAM) === "true";

	const handleDone = async () => {
		if (onDone) {
			try {
				await onDone();
			} catch (error) {
				console.error("Failed to complete action:", error);
			}
		}
	};

	const handleAdd = () => {
		if (onAdd) {
			onAdd();
		}
	};

	return (
		<div
			data-testid="nav-edit-buttons"
			className={css({
				display: "flex",
				justifyContent: isEdit ? "space-around" : "flex-end",
				padding: "10px",
				backgroundColor: "background.lightGray",
			})}
		>
			{isEdit && (
				<>
					<Button
						data-testid="nav-new-page-button"
						variant="outline"
						size="large"
						onClick={handleAdd}
						disabled={isError || isLoading}
					>
						<AddAction color="primary" />
					</Button>
					<Button
						data-testid="nav-done-button"
						variant="fill"
						size="large"
						onClick={handleDone}
						disabled={isError || isLoading}
					>
						<DoneAction />
					</Button>
				</>
			)}
			{!isEdit && !isError && (
				<Link href={`${pathname}?${NAV_EDIT_PARAM}=true`}>
					<Button
						data-testid="nav-edit-button"
						variant="fill"
						size="large"
						disabled={isError || isLoading}
					>
						<EditAction />
					</Button>
				</Link>
			)}
			{!isEdit && isError && (
				<Button
					data-testid="nav-edit-button"
					variant="fill"
					size="large"
					disabled
				>
					<EditAction />
				</Button>
			)}
		</div>
	);
};
