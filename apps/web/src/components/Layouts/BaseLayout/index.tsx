import Link from "next/link";
import { css } from "styled-system/css";
import { Nav } from "@/components/Nav";
import { ResponsiveDrawer } from "@/components/Nav/ResponsiveDrawer";
import { SvgLogo } from "@/components/Svg/Logo";

const HEADER_HEIGHT_SP = "68px";

type Props = {
	children: React.ReactNode;
};

export const BaseLayout = (props: Props) => {
	return (
		<div
			className={css({
				display: "grid",
				md: {
					gridTemplateColumns: "280px 1fr",
					gap: "40px",
				},
				mdDown: {
					gridTemplateRows: "auto 1fr",
				},
			})}
		>
			<div
				className={css({
					display: "grid",
					gridTemplateRows: "1fr auto",
					borderRight: "1px solid",
					borderRightColor: "background.lightGray",
				})}
			>
				<div
					className={css({
						backgroundColor: "white",
						md: {
							display: "grid",
							gridTemplateRows: "auto 1fr",
							gap: "20px",
							height: "100dvh",
							paddingTop: "30px",
							overflow: "auto",
						},
						mdDown: {
							position: "sticky",
							top: "0",
							zIndex: 1,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							height: HEADER_HEIGHT_SP,
							padding: "16px",
						},
					})}
				>
					<header>
						<Link href="/">
							<h1
								className={css({
									display: "flex",
									alignItems: "center",
									gap: "10px",
									textStyle: "title",
									md: {
										paddingLeft: "40px",
									},
								})}
							>
								<SvgLogo />
								{/* NOTE: ロゴのフォント、画像などは提供されていないようだったので、一旦テキストで表示しています */}
								ServiceName
							</h1>
						</Link>
					</header>

					{/* グローバルメニュー */}
					<div
						className={css({
							display: "grid",
							mdDown: {
								display: "none",
							},
						})}
					>
						<Nav />
					</div>

					{/* ハンバーガーメニュー */}
					<div
						className={css({
							display: "block",
							md: {
								display: "none",
							},
						})}
					>
						<ResponsiveDrawer>
							<Nav />
						</ResponsiveDrawer>
					</div>
				</div>
			</div>

			<div
				className={css({
					display: "grid",
					gridTemplateRows: "1fr auto",
					height: "100dvh",
					overflow: "auto",
					mdDown: {
						height: `calc(100dvh - ${HEADER_HEIGHT_SP})`,
					},
				})}
			>
				<main>{props.children}</main>
				<footer
					className={css({
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						paddingBlock: "20px",
						textStyle: "caption",
						md: {
							paddingRight: "40px",
						},
						mdDown: {
							paddingInline: "12px",
						},
					})}
				>
					<p>Copyright © 2021 Sample</p>
					<p>運営会社</p>
				</footer>
			</div>
		</div>
	);
};
