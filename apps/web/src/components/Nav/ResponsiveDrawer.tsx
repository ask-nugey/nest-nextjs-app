"use client";

import { Drawer } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { css, cx } from "styled-system/css";
import { Button } from "@/components/Button";

type Props = {
	children: React.ReactNode;
};

export const ResponsiveDrawer = (props: Props) => {
	const drawerId = useId();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const prevPathnameRef = useRef(pathname);

	const handleClose = () => setOpen(false);
	const toggle = () => setOpen((prev) => !prev);

	// URL変更を検知してメニューを閉じる
	useEffect(() => {
		if (prevPathnameRef.current !== pathname) {
			setOpen(false);
			prevPathnameRef.current = pathname;
		}
	}, [pathname]);

	const hamburgerStyle = css({
		display: "inline-block",
		position: "relative",
		width: "18px",
		height: "2px",
		backgroundColor: "text.default",
		transition: "background-color 0.2s ease, transform 0.2s ease",
		"&::before, &::after": {
			content: '""',
			position: "absolute",
			left: 0,
			width: "18px",
			height: "2px",
			backgroundColor: "text.default",
			transition: "transform 0.2s ease, top 0.2s ease",
		},
		"&::before": { top: "-6px" },
		"&::after": { top: "6px" },
	});

	const hamburgerOpenStyle = css({
		backgroundColor: "transparent",
		transform: "rotate(45deg)",
		"&::before": {
			top: 0,
			transform: "rotate(90deg)",
		},
		"&::after": {
			top: 0,
			transform: "rotate(180deg)",
		},
	});

	return (
		<>
			<Button
				variant="icon"
				aria-pressed={open}
				onClick={toggle}
				className={css({
					position: "relative",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "8px",
					padding: "3px",
					borderColor: "transparent",
					zIndex: 2,
					backgroundColor: "background.white",
				})}
				data-open={open}
			>
				<span className={cx(hamburgerStyle, open && hamburgerOpenStyle)} />
			</Button>

			<Drawer
				id={drawerId}
				placement="left"
				open={open}
				onClose={handleClose}
				closeIcon={false}
				styles={{ body: { padding: 0 } }}
				style={{ width: "80%" }}
				mask={false}
			>
				<div
					className={css({
						display: "grid",
						height: "100dvh",
					})}
				>
					{props.children}
				</div>
			</Drawer>

			{open && (
				<button
					type="button"
					onClick={handleClose}
					className={css({
						position: "fixed",
						top: "0",
						right: "0",
						bottom: "0",
						left: "0",
						zIndex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.2)",
					})}
				/>
			)}
		</>
	);
};
